# Current Project

## What We Are Building

AnimationStudio helps turn things Gal wants to explain into productive, understandable animations. Every animation project is self-contained under `projects/<name>/`, with its own script, spec, props, assets, source code, and output.

## What Good Looks Like

- A short explanation can become a clear animation spec.
- The spec can become a build inside `projects/<name>/src/`.
- Revisions can be requested naturally by beat, timestamp, or visual intent.
- Agents know where to read context (`agent-context/`) and where to put outputs (`projects/<name>/`).
- The system stays model-agnostic through shared files in `agent-context/`.
- Shared TypeScript types and utilities live in `packages/` under the `@studio/` scope.

## What To Avoid

- Building a Photoshop, PowerPoint, Claude Design, or generic animation studio clone.
- Hiding creative decisions inside code before the spec is reviewed.
- Letting agent-specific instruction files become competing sources of truth.
- Routing new work to root `scripts/`, `specs/`, `assets/`, or `output/` — those folders no longer exist.
- Using `npm`, `yarn`, or `npx` — this workspace uses `pnpm` exclusively.
