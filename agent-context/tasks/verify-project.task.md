# Task: Verify Project

## Use When

The user wants to validate a project before building or rendering, or when `build-animation` or `render` is about to run and a preflight check is needed.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Load `agent-context/map/adapter-registry.md`.
3. Load `agent-context/intent/conventions.md`.

## Inputs

| Input | Required | Notes |
|---|---|---|
| Project slug | Yes | Must match a folder under `{projects}/` |

## Steps

1. Confirm `{projects}/<slug>/` exists. Stop with a clear message if not found.
2. Read `{projects}/<slug>/project.config.ts` to get `adapter`, `variants`, `collection` (if any), and `campaign` (if any).
3. **Adapter check:** look up `adapter` in `agent-context/map/adapter-registry.md`.
   - If the adapter is not in the registry, stop and list all valid adapter names.
4. **Variants check:** for each variant in `variants`:
   - Confirm `{projects}/<slug>/scripts/<variant>.script.md` exists.
   - Confirm `{projects}/<slug>/specs/<variant>.spec.md` exists.
   - Confirm `{projects}/<slug>/props/<variant>.json` exists.
   - Report any missing files; list them all before stopping.
5. **Audio check:** if `{projects}/<slug>/specs/<variant>.spec.md` references a compiled timeline, confirm `{projects}/<slug>/audio/compiled.timeline.json` exists.
6. **Collection check** *(if `collection` is set):* confirm `{projects}/<collection>/_theme/` exists and the `@studio/theme-<collection>` package is listed as a dependency in the project's `package.json`.
7. **Campaign check** *(if `campaign.slug` is set):* invoke `campaign-resolution` skill. If `CAMPAIGN_NOT_FOUND` is returned, warn but do not stop — note that the build will run in standalone mode.
8. Report pass or fail:
   - **Pass:** list all checks as ✅ and recommend the next task (`build-animation` or `preview`).
   - **Fail:** list each failing check as ❌ with the specific file path missing or the invalid value found. Do not proceed to build.

## Failure Modes

| Condition | Action |
|---|---|
| Project slug not found | Stop immediately |
| Unknown adapter | List valid adapters and stop |
| Missing variant files | List all missing files and stop |
| Missing compiled timeline (when referenced) | List as ❌; stop |
| Campaign not found | Warn only — do not stop |

## Output

A pass/fail report listing all checked files and values. On pass, recommended next task.
