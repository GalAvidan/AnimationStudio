# Lifecycle

Canonical lifecycle for AnimationStudio projects. This vocabulary is used by `status.md`, `resume-project`, and `update-status`.

## Phase Order

```
created -> scripted -> spec-drafted -> spec-approved -> built -> previewed -> rendered -> revising -> done/archived
```

## Phase Meaning

| Phase | Meaning | Typical next task |
|---|---|---|
| `created` | Project scaffold exists with config, scripts/specs/props placeholders. | `create-script` |
| `scripted` | Script draft exists for at least one variant. | `create-spec` |
| `spec-drafted` | Creative spec exists but is not explicitly approved. | human review / `create-spec` refine |
| `spec-approved` | Spec is reviewed and approved for build work. | `build-animation` |
| `built` | Composition/source code is implemented for the target variant. | `preview` or `render` |
| `previewed` | Local preview has run for review. | `revise-animation` or `render` |
| `rendered` | Final artifact was rendered for at least one variant. | `revise-animation` or archive |
| `revising` | Active changes are being made to spec/code after review feedback. | `preview` / `render` |
| `done/archived` | Project is complete or paused and moved to archive. | `rehydrate-project` if resumed |

## Rules

- Use only phases listed above.
- `update-status` is the sole writer of `status.md`.
- Mutating tasks must end with an `update-status` step.
- `resume-project` is read-only and does not mutate files.
