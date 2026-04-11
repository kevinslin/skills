# Flow Overview Workflow

## Use When

- Writing the required `### Overview` section at the beginning of `## Call path` in a flow doc
- Revising an existing overview so the main lifecycle can be read top-to-bottom before the detailed phase sections
- Summarizing the major handoffs across multiple phases, files, or runtime boundaries in one linear pass

## Template

- `@references/flow-overview/template.md`

## Output Location

- To be determined by the caller

## Authoring Requirements

- Use [$sudocode](/Users/kevinlin/.codex/skills/sudocode/SKILL.md) to author the overview block so the linear flow, exact identifiers, and inline helper rules stay consistent with the shared sudocode style.
- Use a `### Overview` heading followed by one `### Phase N: ...` markdown heading per overview phase.
- Put each overview phase in its own fenced `ts` block directly under the phase heading.
- Treat the overview as a linear skeleton of the full flow; keep the phase headings in lifecycle order.
- Within each phase, add numbered substep comments such as `// 1.1 ...`.
- Use exact identifiers from source code: function names, vars, and fields.
- Always wrap behavior in an entry function/module declaration for the relevant code path, with parameters that explain the handoff, for example `upload_and_create_hazelnut(file) { ... }`.
- Use one `// Source:` annotation per function/module declaration, and place it immediately above the declaration or inlined call block it supports. Do not stack several `// Source:` lines above one declaration.
- Show only the main path and major handoffs.
- Keep branch logic, rejection paths, retries, and alternate flows out of the overview unless omitting them would make the next handoff impossible to understand.
- Inline only short helper bodies at the callsite:
  ```ts
  target_call(args) {
    // short inlined body
  }
  ```
- Keep the overview grepable: every source annotation should use a tight repo-relative file path with line numbers.
- End on the terminal effect for the flow, for example serving refs, finalizing a write, returning a response, or publishing a snapshot.
- The detailed phase sections below the overview should explain the branch behavior and contracts omitted from the overview. They may reuse the same `### Phase N: ...` names, but should include the required trigger, entrypoints, ordered call path, state transitions, branch points, and external boundaries.

## Example

A good overview starts from the real external entrypoint, wraps each handoff in a concrete function/module declaration, and uses one source annotation for each declaration. This example uses placeholder repo paths so the template stays independent of any private codebase:

````md
### Overview

### Phase 1: Accept executable upload

```ts
// 1.1 Upload receives an executable archive, stores its bytes, and creates an execution request.
// Source: example_app/uploads/routes.py#L42-L88
upload_and_create_execution_request(file, storage_client, user_id) {
  archive_bytes := file.read()
  archive_bytes := normalize_executable_archive(archive_bytes=archive_bytes, uploaded_filename=file.filename)
  artifact_id := upload_archive_from_bytes(archive_bytes=archive_bytes, storage_client=storage_client)
  request := create_execution_request(archive_bytes=archive_bytes, artifact_id=artifact_id, user_id=user_id)
}

// 1.2 Request creation parses metadata before durable execution records are created.
// Source: example_app/executions/create.py#L118-L176
create_execution_request(archive_bytes, artifact_id, user_id) {
  // Source: example_app/executions/parser.py#L55-L92
  manifest := parse_executable_archive(archive_bytes, artifact_id) {
    manifest := read_manifest(zip_bytes=archive_bytes, artifact_id=artifact_id)
    return manifest
  }
  execution_record := create_execution_record(manifest=manifest, archive_bytes=archive_bytes, artifact_id=artifact_id, user_id=user_id)
}
```

### Phase 2: Stage executable in a container

```ts
// 2.1 Resolve or create a container session, upload the stored archive, and unpack it into the runtime workspace.
// Source: example_app/runtime/container_session.py#L210-L274
stage_executable_for_run(execution_record, container_pool, workspace_root) {
  container := container_pool.get_or_create_session(owner_id=execution_record.user_id)
  archive_path := container.upload_bytes(name=execution_record.artifact_id, bytes=execution_record.archive_bytes)
  executable_dir := unpack_executable_archive(container=container, archive_path=archive_path, workspace_root=workspace_root)
  return PreparedRun(container=container, executable_dir=executable_dir)
}
```

### Phase 3: Execute command

```ts
// 3.1 Run the requested entry command inside the prepared container and return the terminal result.
// Source: example_app/runtime/runner.py#L88-L142
run_prepared_executable(prepared_run, command, timeout, env) {
  result := prepared_run.container.exec(cmd=command, workdir=prepared_run.executable_dir, timeout=timeout, env=env)
  persist_run_result(run_id=prepared_run.run_id, result=result)
  return result
}
```
````

## Instructions

1. Read the flow doc and identify the existing phase boundaries under `## Call path`.
2. Choose the single main path that best explains the lifecycle end to end.
3. Copy `@references/flow-overview/template.md` into a `### Overview` section directly under `## Call path`.
4. Replace the placeholder phase names with the real flow phases from the document.
5. Choose the concrete entry function/module for each substep, starting from the external entrypoint when the flow has one.
6. For each numbered substep, keep only the state transitions needed to understand the next major handoff.
7. Preserve exact identifiers from code and inline only short helper bodies when they improve readability.
8. Remove detailed branch logic from the overview. Push that detail into the matching detailed phase sections below.
9. Check the overview linearly from top to bottom:
   - every line should lead naturally to the next line
   - the reader should not need to stop to reason about alternate paths
10. Check the detailed phases after the overview:
   - each phase should now focus on logic that is not already obvious from the overview
   - branch points, guards, and error contracts should remain explicit there

## Review Checklist

- Can the overview be read top-to-bottom without resolving alternate paths?
- Does each phase in the overview clearly hand off to the next phase?
- Does each substep show the entry function/module with relevant parameters?
- Is there exactly one nearby `// Source:` annotation per function/module declaration?
- Are the identifiers grepable back to source?
- Did I keep callsite + inline body when inlining short helpers?
- Did I leave branch detail to the detailed phase sections?
