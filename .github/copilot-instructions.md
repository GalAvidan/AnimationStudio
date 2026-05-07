# Copilot Instructions

AnimationStudio is an agent-assisted workflow for producing explanatory animations with Remotion. It is not a design app clone.

Use `agent-context/` as the canonical project context. This file is only a VS Code Copilot adapter.

Before implementing a request, read:

- `agent-context/intent/overview.md`
- `agent-context/map/workflow.md`
- `agent-context/intent/conventions.md`
- The matching task in `agent-context/tasks/`
- Any skills referenced by that task

Follow the Script -> Spec -> Build -> Preview -> Render -> Revise workflow. Keep scripts and specs readable by humans, and avoid putting implementation details into specs before the build step derives them.
