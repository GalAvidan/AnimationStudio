# Current Project

## What We Are Building

AnimationStudio helps turn things Gal wants to explain into productive, understandable animations. The Studio repo owns framework logic, while project content resolves through aliases from `agent-context/intent/vault.md` (for example `{projects}/<name>/`).

## What Good Looks Like

- A short explanation can become a clear animation spec.
- The spec can become a build inside `{projects}/<name>/src/`.
- Revisions can be requested naturally by beat, timestamp, or visual intent.
- Agents know where to read context (`agent-context/`) and where to put outputs (`{projects}/<name>/`).
- The system stays model-agnostic through shared files in `agent-context/`.
- Shared TypeScript types and utilities live in `packages/` under the `@studio/` scope.

## Project Location (as of 2026-05-29)

- Active projects live at **`{projects}`** which resolves to `C:\Git\Vault\AnimationStudio\projects`.
- `C:\Git\AnimationStudio\projects\` contains **only templates** (`_template`, `_template-motion-canvas`). Do not create new projects here.
- Legacy projects (character-pilot, pythagorean-theorem, agentic-ai-architecture, why-ice-floats, why-sky-is-blue) are archived at `Vault/AnimationStudio/archive/`. See `Vault/AnimationStudio/archive/ARCHIVE_INDEX.md`.

## What To Avoid

- Building a Photoshop, PowerPoint, Claude Design, or generic animation studio clone.
- Hiding creative decisions inside code before the spec is reviewed.
- Letting agent-specific instruction files become competing sources of truth.
- Routing new work to root `scripts/`, `specs/`, `assets/`, or `output/` — those folders no longer exist.
- Using `npm`, `yarn`, or `npx` — this workspace uses `pnpm` exclusively.
- Creating project folders under `C:\Git\AnimationStudio\projects\` — new projects go to `{projects}` (Vault).
