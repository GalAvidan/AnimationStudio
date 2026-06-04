# Task: Approve Spec

## Use When

The spec has been reviewed and is ready to be used by `build-animation`.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/intent/lifecycle.md`.
3. Load `agent-context/intent/conventions.md`.
4. Load `{projects}/<name>/specs/<variant>.spec.md`.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project slug | Yes | Must match a folder under `{projects}/`. |
| Variant | Yes | Must match an existing variant in `project.config.ts`. |
| Approver | Yes | Human name/handle approving the spec. |

## Validation

- Confirm `{projects}/<slug>/specs/<variant>.spec.md` exists.
- Confirm frontmatter fields `status`, `approvedBy`, `approvedDate` exist.

## Steps

1. Open `{projects}/<slug>/specs/<variant>.spec.md`.
2. Set frontmatter:
   - `status: Approved`
   - `approvedBy: <Approver>`
   - `approvedDate: YYYY-MM-DD`
3. Save the spec file.
4. Call `update-status` to record:
   - `phase`: `spec-approved`
   - variant update: `specApproved = Approved` for `<variant>`
   - `next action`: "Run build-animation"
   - `session summary`: "Spec approved for build"

## Failure Modes

| Condition | Action |
|---|---|
| Spec file missing | Stop and report |
| Required frontmatter missing | Stop and report; fix the spec template before approving |

## Output

Approved spec at `{projects}/<slug>/specs/<variant>.spec.md` ready for build.
