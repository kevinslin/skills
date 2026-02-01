#!/usr/bin/env python3
import argparse
import json
import os
import sys
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

DEFAULT_CONFIG_PATH = "dev.watch.json"
DEFAULT_TOKEN_ENV = "GITHUB_TOKEN"
GITHUB_API_BASE = "https://api.github.com"


def eprint(message):
    print(message, file=sys.stderr)


def expand_path(path):
    return os.path.expandvars(os.path.expanduser(path))


def load_json(path):
    if not path or not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def parse_issue_url(url):
    parsed = urlparse(url)
    parts = parsed.path.strip("/").split("/")
    if len(parts) < 4:
        raise ValueError(f"Unrecognized issue URL: {url}")
    owner, repo, kind, number = parts[0], parts[1], parts[2], parts[3]
    if kind not in ("issues", "pull"):
        raise ValueError(f"Unsupported issue URL (expected /issues/ or /pull/): {url}")
    try:
        number_int = int(number)
    except ValueError as err:
        raise ValueError(f"Invalid issue number in URL: {url}") from err
    return owner, repo, number_int


def post_comment(owner, repo, number, body, token):
    payload = json.dumps({"body": body}).encode("utf-8")
    request = Request(
        f"{GITHUB_API_BASE}/repos/{owner}/{repo}/issues/{number}/comments",
        data=payload,
        method="POST",
    )
    request.add_header("Authorization", f"Bearer {token}")
    request.add_header("Accept", "application/vnd.github+json")
    request.add_header("Content-Type", "application/json")
    request.add_header("User-Agent", "dev.watch")
    try:
        with urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as err:
        details = err.read().decode("utf-8") if err.fp else str(err)
        raise RuntimeError(f"GitHub API error: {err.code} {details}") from err
    except URLError as err:
        raise RuntimeError(f"GitHub API connection error: {err}") from err


def parse_args():
    parser = argparse.ArgumentParser(description="Post a comment to a GitHub issue.")
    parser.add_argument("--issue-url", required=True, help="Full GitHub issue URL.")
    parser.add_argument("--message", help="Comment body text.")
    parser.add_argument("--message-file", help="Path to file containing the comment body.")
    parser.add_argument("--config", default=os.getenv("DEV_WATCH_CONFIG", DEFAULT_CONFIG_PATH))
    parser.add_argument("--token-env", help="Override GitHub token env var name.")
    return parser.parse_args()


def resolve_message(message, message_file):
    if message and message_file:
        raise ValueError("Provide either --message or --message-file, not both.")
    if message_file:
        path = expand_path(message_file)
        with open(path, "r", encoding="utf-8") as handle:
            return handle.read().strip()
    if message:
        return message.strip()
    stdin = sys.stdin.read().strip()
    if stdin:
        return stdin
    raise ValueError("Missing comment body. Provide --message, --message-file, or stdin.")


def main():
    args = parse_args()
    try:
        body = resolve_message(args.message, args.message_file)
    except ValueError as err:
        eprint(str(err))
        return 2

    config_path = expand_path(args.config) if args.config else None
    config = load_json(config_path)
    token_env = args.token_env or (config or {}).get("github_token_env", DEFAULT_TOKEN_ENV)
    token = os.getenv(token_env)
    if not token:
        eprint(f"Missing GitHub token in env var: {token_env}")
        return 2

    try:
        owner, repo, number = parse_issue_url(args.issue_url)
    except ValueError as err:
        eprint(str(err))
        return 2

    try:
        result = post_comment(owner, repo, number, body, token)
    except RuntimeError as err:
        eprint(str(err))
        return 1

    print(json.dumps({"comment_url": result.get("html_url")}, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
