# Workflow Map

## Lifecycle

1. **Create project:** run `create-project` task → scaffolds `projects/<name>/` from `projects/_template/`.
2. **Script:** edit `projects/<name>/scripts/<variant>.script.md` or use `create-script` task.
3. **Spec:** run `create-spec` task → creates `projects/<name>/specs/<variant>.spec.md`.
4. **Build:** run `build-animation` task → reads `project.config.ts`, loads adapter skills, builds `src/`.
5. **Preview:** run `pnpm --filter ./projects/<name> dev` or use `preview` task.
6. **Render:** run `pnpm --filter ./projects/<name> render -- --props=./props/<variant>.json` or use `render` task.
7. **Revise:** run `revise-animation` task → edits spec or code based on beat-level feedback.

## Folder Routing

| Request | Load First | Work In | Output |
|---|---|---|---|
| Create new project | `agent-context/tasks/create-project.task.md` | `projects/<name>/` | Scaffolded project |
| Turn idea into script | `agent-context/tasks/create-script.task.md` | `projects/<name>/scripts/` | `<variant>.script.md` |
| Turn script into spec | `agent-context/tasks/create-spec.task.md` | `projects/<name>/specs/` | `<variant>.spec.md` |
| Build animation | `agent-context/tasks/build-animation.task.md` | `projects/<name>/src/` | Animation source files |
| Revise animation | `agent-context/tasks/revise-animation.task.md` | `projects/<name>/specs/` and `src/` | Updated spec or code |
| Preview | `agent-context/tasks/preview.task.md` | `projects/<name>/` | Running preview |
| Render | `agent-context/tasks/render.task.md` | `projects/<name>/` | `output/<variant>.mp4` |

## Adapter Resolution

1. Read `project.config.ts` in the project folder → get `adapter` field.
2. Look up the `adapter` row in `agent-context/map/adapter-registry.md`.
3. Load skills from the `skills dir` column.
4. Use `preview cmd` and `render cmd` from the registry verbatim (substitute `<name>` and `<variant>`).

## Current Projects

*(Updated by the `refresh-map` task as projects are added.)*
