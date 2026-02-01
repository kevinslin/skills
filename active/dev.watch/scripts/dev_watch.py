#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

QUERY_TEMPLATE = """
query($owner: String!, $number: Int!, $after: String) {{
  {owner_type}(login: $owner) {{
    projectV2(number: $number) {{
      id
      title
      items(first: 100, after: $after) {{
        nodes {{
          id
          content {{
            __typename
            ... on Issue {{
              id
              url
              title
              number
              repository {{
                nameWithOwner
              }}
            }}
          }}
          fieldValues(first: 20) {{
            nodes {{
              __typename
              ... on ProjectV2ItemFieldSingleSelectValue {{
                name
                field {{
                  __typename
                  ... on ProjectV2SingleSelectField {{
                    name
                  }}
                }}
              }}
            }}
          }}
        }}
        pageInfo {{
          hasNextPage
          endCursor
        }}
      }}
    }}
  }}
}}
""".strip()

DEFAULT_STATUS_FIELD = "Status"
DEFAULT_TODO_STATUS = "Todo"
DEFAULT_CONFIG_PATH = "dev.watch.json"
DEFAULT_TOKEN_ENV = "GITHUB_TOKEN"
DEFAULT_STATE_FILE = "~/.dev-watch/state.json"
DEFAULT_POLL_INTERVAL = 60
DEFAULT_LOOPS_PARALLEL = False


def eprint(message):
    print(message, file=sys.stderr)


def expand_path(path):
    return os.path.expandvars(os.path.expanduser(path))


def load_json(path, default=None):
    if not os.path.exists(path):
        return default
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, sort_keys=True)


def graphql_request(query, variables, token):
    body = json.dumps({"query": query, "variables": variables}).encode("utf-8")
    request = Request("https://api.github.com/graphql", data=body, method="POST")
    request.add_header("Authorization", f"Bearer {token}")
    request.add_header("Accept", "application/vnd.github+json")
    request.add_header("Content-Type", "application/json")
    try:
        with urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except HTTPError as err:
        details = err.read().decode("utf-8") if err.fp else str(err)
        raise RuntimeError(f"GitHub API error: {err.code} {details}") from err
    except URLError as err:
        raise RuntimeError(f"GitHub API connection error: {err}") from err

    if "errors" in payload:
        raise RuntimeError(f"GitHub API returned errors: {payload['errors']}")
    return payload.get("data", {})


def parse_project_url(url):
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    parts = path.split("/")
    if len(parts) < 4:
        raise ValueError(f"Unrecognized project URL: {url}")
    if parts[0] not in ("orgs", "users"):
        raise ValueError(f"Unsupported project URL (expected /orgs/ or /users/): {url}")
    if parts[2] != "projects":
        raise ValueError(f"Unsupported project URL (expected /projects/): {url}")
    owner = parts[1]
    try:
        number = int(parts[3])
    except ValueError as err:
        raise ValueError(f"Invalid project number in URL: {url}") from err
    owner_type = "organization" if parts[0] == "orgs" else "user"
    project_key = f"{owner_type}:{owner}:{number}"
    return owner_type, owner, number, project_key


def fetch_project_items(owner_type, owner, number, token):
    items = []
    after = None
    project_title = None
    query = QUERY_TEMPLATE.format(owner_type=owner_type)

    while True:
        data = graphql_request(query, {"owner": owner, "number": number, "after": after}, token)
        root = data.get(owner_type)
        if not root or not root.get("projectV2"):
            raise RuntimeError(f"Project not found for {owner_type} {owner} #{number}")
        project = root["projectV2"]
        project_title = project.get("title")
        page = project.get("items", {})
        nodes = page.get("nodes") or []
        items.extend(nodes)
        page_info = page.get("pageInfo") or {}
        if not page_info.get("hasNextPage"):
            break
        after = page_info.get("endCursor")

    return project_title, items


def get_status(item, status_field):
    field_values = item.get("fieldValues", {}).get("nodes") or []
    for field_value in field_values:
        if field_value.get("__typename") != "ProjectV2ItemFieldSingleSelectValue":
            continue
        field = field_value.get("field") or {}
        field_name = field.get("name")
        if not field_name:
            continue
        if field_name.casefold() != status_field.casefold():
            continue
        return field_value.get("name")
    return None


def extract_issue(item):
    content = item.get("content") or {}
    if content.get("__typename") != "Issue":
        return None
    repository = content.get("repository") or {}
    return {
        "id": content.get("id"),
        "url": content.get("url"),
        "title": content.get("title"),
        "number": content.get("number"),
        "repo": repository.get("nameWithOwner"),
    }


def collect_events(config, state, emit_on_first_run):
    events = []
    errors = []
    projects_state = state.setdefault("projects", {})

    for project in config.get("projects", []):
        project_url = project.get("url")
        if not project_url:
            errors.append("Project entry missing 'url'.")
            continue
        try:
            owner_type, owner, number, project_key = parse_project_url(project_url)
        except ValueError as err:
            errors.append(str(err))
            continue

        status_field = project.get("status_field", DEFAULT_STATUS_FIELD)
        todo_status = project.get("todo_status", DEFAULT_TODO_STATUS)
        try:
            project_title, items = fetch_project_items(owner_type, owner, number, config["_token"])
        except RuntimeError as err:
            errors.append(str(err))
            continue

        prior_state = projects_state.get(project_key, {})
        initialized = project_key in projects_state
        next_state = {}

        for item in items:
            issue = extract_issue(item)
            if not issue or not issue.get("url"):
                continue
            status = get_status(item, status_field)
            if status is None:
                continue
            item_id = item.get("id")
            if not item_id:
                continue
            next_state[item_id] = status
            prev_status = prior_state.get(item_id)

            if status.casefold() == todo_status.casefold():
                if (initialized or emit_on_first_run) and prev_status != status:
                    events.append({
                        "project_key": project_key,
                        "project_url": project_url,
                        "project_title": project_title,
                        "issue_url": issue.get("url"),
                        "issue_title": issue.get("title"),
                        "issue_number": issue.get("number"),
                        "issue_repo": issue.get("repo"),
                        "status": status,
                        "previous_status": prev_status,
                    })

        projects_state[project_key] = next_state

    return events, errors


def parse_args():
    parser = argparse.ArgumentParser(description="Watch GitHub Projects for issues moved to Todo.")
    parser.add_argument("--config", default=os.getenv("DEV_WATCH_CONFIG", DEFAULT_CONFIG_PATH))
    parser.add_argument("--once", action="store_true", help="Run a single poll and exit.")
    parser.add_argument("--watch", action="store_true", help="Poll continuously.")
    parser.add_argument("--interval", type=int, help="Override poll interval in seconds.")
    parser.add_argument("--emit-on-first-run", action="store_true", help="Emit Todo transitions without existing state.")
    return parser.parse_args()


def build_task_string(event):
    parts = []
    repo = event.get("issue_repo")
    title = event.get("issue_title")
    url = event.get("issue_url")
    if repo:
        parts.append(f"repo: {repo}")
    if title:
        parts.append(f"title: {title}")
    if url:
        parts.append(f"url: {url}")
    return " | ".join(parts)


def run_loops(event, config):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    loops_script = os.path.join(script_dir, "loops.sh")
    if not os.path.exists(loops_script):
        eprint(f"loops.sh not found at {loops_script}")
        return 1

    task = build_task_string(event)
    if not task:
        eprint("Skipping loops.sh: empty task string.")
        return 1

    repo_name = ""
    repo_full = event.get("issue_repo")
    if repo_full and "/" in repo_full:
        repo_name = repo_full.rsplit("/", 1)[-1]

    cmd = [loops_script]
    if config.get("loops_parallel", DEFAULT_LOOPS_PARALLEL):
        cmd.append("--parallel")
    if repo_name:
        cmd.extend(["--repo", repo_name])
    cmd.append(task)

    try:
        subprocess.run(cmd, check=False, stdout=sys.stderr, stderr=sys.stderr)
    except OSError as err:
        eprint(f"Failed to run loops.sh: {err}")
        return 1
    return 0


def main():
    args = parse_args()
    if args.once and args.watch:
        eprint("Choose either --once or --watch, not both.")
        return 2

    config_path = expand_path(args.config)
    config = load_json(config_path)
    if not config:
        eprint(f"Config not found or empty: {config_path}")
        return 2

    token_env = config.get("github_token_env", DEFAULT_TOKEN_ENV)
    token = os.getenv(token_env)
    if not token:
        eprint(f"Missing GitHub token in env var: {token_env}")
        return 2
    config["_token"] = token

    state_path = expand_path(config.get("state_file", DEFAULT_STATE_FILE))
    state = load_json(state_path, default={}) or {}

    poll_interval = args.interval or config.get("poll_interval_seconds", DEFAULT_POLL_INTERVAL)
    emit_on_first_run = args.emit_on_first_run or config.get("emit_on_first_run", False)

    if not args.watch and not args.once:
        args.once = True

    exit_code = 0
    while True:
        timestamp = datetime.now(timezone.utc).isoformat()
        events, errors = collect_events(config, state, emit_on_first_run)
        payload = {
            "timestamp": timestamp,
            "events": events,
            "errors": errors,
        }
        print(json.dumps(payload, sort_keys=True))
        sys.stdout.flush()

        if events:
            for event in events:
                result = run_loops(event, config)
                if result != 0:
                    exit_code = 1

        save_json(state_path, state)
        if errors:
            exit_code = 1

        if args.once:
            break
        time.sleep(max(5, int(poll_interval)))

    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
