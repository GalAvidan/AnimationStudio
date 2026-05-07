# Workflow Map

## Lifecycle

1. Script: capture the explanation in `scripts/`.
2. Spec: create a creative direction file in `specs/`.
3. Build: create or update a Remotion project in `projects/`.
4. Preview: run Remotion Studio from the project folder.
5. Render: export video or stills to `output/`.
6. Revise: change the spec or project based on beat-level feedback.

## Folder Routing

| Request | Load First | Work In | Output |
|---|---|---|---|
| Turn idea into script | `agent-context/tasks/create-script.task.md` | `scripts/` | `<project-name>_script.md` |
| Turn script into spec | `agent-context/tasks/create-spec.task.md` | `specs/` | `<project-name>_spec.md` |
| Build animation | `agent-context/tasks/build-animation.task.md` | `projects/<project-name>/` | Remotion files |
| Revise animation | `agent-context/tasks/revise-animation.task.md` | `specs/` and `projects/` | Updated spec/code |
| Preview | `agent-context/tasks/preview.task.md` | `projects/<project-name>/` | Remotion Studio |
| Render | `agent-context/tasks/render.task.md` | `projects/<project-name>/` | `output/<project-name>.mp4` |

## Current Projects

- `projects/explainer-starter/`: minimal Remotion starter used to prove the workflow.
