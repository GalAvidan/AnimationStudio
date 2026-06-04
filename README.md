# AnimationStudio

AnimationStudio is a workflow-first repository for creating explanatory animations with AI agents and Remotion.

The point is not to build a design app. The point is to make a repeatable path from an idea to a clear animation:

**Script → Spec → Build → Preview → Render → Revise**

## What This Repo Is

- A structured workspace where every animation project is fully self-contained under `projects/<name>/`.
- A shared context system (`agent-context/`) that helps different agents work consistently.
- A pnpm workspace with shared TypeScript packages under `packages/`.
- A practical Remotion baseline for code-generated animation in VS Code.

## What This Repo Is Not

- Not Photoshop, PowerPoint, or a general animation studio UI.
- Not a one-shot prompt folder where creative decisions disappear into code.
- Not a collection of root-level scripts, specs, assets, or outputs.

## Folder Structure

```
agent-context/          Shared agentic brain: intent, maps, skills, tasks
packages/               Shared TypeScript workspace packages (@studio/*)
  config-tsconfig/      Base tsconfig extended by all packages and projects
  config-eslint/        Shared flat ESLint config
  spec-types/           ProjectConfig, Beat, Scene, SyncPoint, BeatTimeline types
  animation-utils/      Renderer-neutral easing/progress/fade helpers
  adapter-contract/     Adapter registry metadata types (Plan 1)
projects/               Self-contained animation projects
  _template/            Scaffolding source (excluded from pnpm workspace)
  <project-name>/       One project, fully self-contained
references/             Shared research and archived narratives
```

## Agent Entry Points

Different agents read different instruction files. These are adapters — shared rules live in `agent-context/`:

- `AGENTS.md` — generic agent adapter
- `CLAUDE.md` — Claude adapter
- `.github/copilot-instructions.md` — Copilot adapter
- `BOT.md`, `CONTEXT.md`, `REFERENCES.md` — human-friendly project context

## Create a New Project

```bash
# From the repo root:
# 1. Use the create-project task (ask your agent) — it copies _template/ and wires project.config.ts.
# 2. Or manually:
cp -r projects/_template projects/my-project
# Edit projects/my-project/project.config.ts, then:
pnpm install
```

## Preview and Render

```bash
# Preview (Remotion Studio):
pnpm --filter ./projects/<name> dev

# Render (pass props via file to avoid shell-escaping issues on Windows):
pnpm --filter ./projects/<name> render -- --props=./props/general.json
```

## Workspace Commands

```bash
pnpm -w run lint        # lint all packages and projects
pnpm -w run typecheck   # typecheck all packages and projects
pnpm -w run build       # build all packages
```

## Workflow

1. Ask the agent to run `create-project` with a project name and subject.
2. Edit `projects/<name>/scripts/<variant>.script.md` with your narration draft.
3. Ask the agent to run `create-spec` to turn the script into a reviewed spec.
4. Ask the agent to run `build-animation` once the spec is approved.
5. Preview: `pnpm --filter ./projects/<name> dev`
6. Render: `pnpm --filter ./projects/<name> render -- --props=./props/<variant>.json`
7. Revise by scene, beat, timestamp, or visual intent.
