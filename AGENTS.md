# AnimationStudio Agent Guide

This repository is an agent-assisted workflow for creating explanatory animations. It is not a general-purpose design application.

## First Read

Before doing project work, load these files in order:

1. `agent-context/intent/overview.md`
2. `agent-context/map/workflow.md`
3. `agent-context/intent/conventions.md`
4. Any task file in `agent-context/tasks/` that matches the user's request
5. Any skill files referenced by that task (core skills from `agent-context/skills/core/`, adapter skills from `agent-context/skills/adapters/<adapter>/`)

## Operating Rules

- Treat `agent-context/` as the canonical source of truth.
- Treat this file as an adapter, not an independent rulebook.
- Every animation project lives entirely under `projects/<name>/` — self-contained with its own `project.config.ts`, scripts, specs, props, assets, src, and output.
- Read `project.config.ts` to get the adapter, variants, and routing for any project.
- Look up the adapter in `agent-context/map/adapter-registry.md` to find the correct skills and commands.
- Keep scripts and specs human-editable.
- Prefer the workflow: Script → Spec → Build → Preview → Render → Revise.
- Ask before creating files outside the documented folders.
- Use `pnpm` for all commands. Never `npm`, `yarn`, or `npx` in scripts or docs.
- Do not route new work to root `scripts/`, `specs/`, `assets/`, or `output/` — those folders no longer exist.
- Do not turn this repo into Photoshop, PowerPoint, Claude Design, or a broad animation studio UI.
- When a request is ambiguous, ask a focused question before building.

## Default Folders

- `projects/<name>/scripts/` — narration drafts for this project
- `projects/<name>/specs/` — creative direction specs for this project
- `projects/<name>/src/` — animation source code for this project
- `projects/<name>/props/` — render props JSON for this project
- `projects/<name>/assets/` — source assets scoped to this project
- `projects/<name>/output/` — rendered videos and stills for this project
- `packages/` — shared TypeScript packages (`@studio/*`)
- `references/` — external notes and research
