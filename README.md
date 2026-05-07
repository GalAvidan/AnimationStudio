# AnimationStudio

AnimationStudio is a workflow-first repository for creating explanatory animations with AI agents and Remotion.

The point is not to build a design app. The point is to make a repeatable path from an idea to a clear animation:

Script -> Spec -> Build -> Preview -> Render -> Revise

## What This Repo Is

- A structured workspace for animation ideas, scripts, specs, assets, Remotion projects, and rendered outputs.
- A shared context system that helps different agents work consistently.
- A practical Remotion starter for code-generated animation in VS Code.

## What This Repo Is Not

- Not Photoshop.
- Not PowerPoint.
- Not Claude Design.
- Not a general animation studio UI.
- Not a one-shot prompt folder where creative decisions disappear into code.

## Folder Guide

- `agent-context/` is the canonical source of truth for agents.
- `scripts/` stores rough explanations and narration drafts.
- `specs/` stores creative direction specs.
- `projects/` stores Remotion projects.
- `assets/` stores source assets, SVGs, audio, fonts, and references.
- `output/` stores rendered videos and stills.
- `references/` stores research and external notes.

## Agent Entry Points

Different agents read different instruction files. To keep the project model-agnostic, these files are adapters:

- `AGENTS.md`
- `CLAUDE.md`
- `.github/copilot-instructions.md`
- `BOT.md`
- `CONTEXT.md`
- `REFERENCES.md`

Shared project rules belong in `agent-context/`.

## How To Use The Workflow

1. Put an idea, outline, transcript, or narration draft in `scripts/`.
2. Ask an agent to create a spec using `agent-context/tasks/create-spec.task.md`.
3. Review and edit the spec in `specs/`.
4. Ask an agent to build the Remotion project using `agent-context/tasks/build-animation.task.md`.
5. Preview from the project folder with `npm run dev`.
6. Render the final video into `output/`.
7. Revise by scene, beat, timestamp, or visual intent.

## Remotion Starter

The starter project lives at `projects/explainer-starter/`.

From that folder:

```powershell
npm install
npm run dev
```

Render the starter composition:

```powershell
npx remotion render src/index.ts ExplainerStarter ../../output/explainer-starter.mp4
```

On Windows, avoid inline JSON props in shell commands. Use a props JSON file when props are needed.

## First Good Test

Use `scripts/explainer-starter_script.md` and ask an agent:

> Turn this script into a spec, then tell me what Remotion scenes you would build before writing code.

That checks whether the workflow is doing its real job: making the explanation clearer before implementation starts.
