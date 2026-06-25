# AnimationStudio Agent Guide

This repository is an agent-assisted workflow for creating explanatory animations. It is not a general-purpose design application.

## First Read

**Start with the minimal context profile** — see `agent-context/intent/context-profiles.md`.
Use `agent-context/map/load-order.md` for the exact file sequence for your workflow.

Default load order:

1. `agent-context/intent/dependencies/vault.md`
2. `agent-context/intent/overview.md`
3. `agent-context/intent/anti-goals-brief.md`
4. `agent-context/map/workflow.md` — only once task type is known
5. The matching task from `agent-context/tasks/` (use `agent-context/map/tasks-index.md` to find it)
6. Skills listed in the task's `Skills:` block (use `agent-context/map/skills-index.md` to locate them)
7. `agent-context/intent/conventions.md` — only if creating or renaming files

## Operating Rules

- Treat `agent-context/` as the canonical source of truth.
- Treat this file as an adapter, not an independent rulebook.
- AnimationStudio is framework-first: keep logic, templates, packages, and task orchestration in this repo.
- Vault is content-first: animation project content resolves via aliases in `agent-context/intent/dependencies/vault.md`.
- Read `project.config.ts` to get the adapter, variants, and routing for any project.
- Look up the adapter in `agent-context/map/adapter-registry.md` to find the correct skills and commands.
- For existing projects, run `resume-project` first to load current state from `{projects}/<name>/status.md`.
- Keep scripts and specs human-editable.
- Prefer the workflow: Script → Spec → Build → Preview → Render → Revise.
- For curriculum commissions, load the linked `as-out` v3 brief before scripting.
  Treat its approved claims as a closed factual boundary and its instructional
  treatment guardrails as the closed teaching boundary; return incomplete
  content instead of researching, inventing it, or teaching against the
  guardrails.
- Ask before creating files outside the documented folders.
- Use `pnpm` for all commands. Never `npm`, `yarn`, or `npx` in scripts or docs.
- Do not route new work to root `scripts/`, `specs/`, `assets/`, or `output/` — those folders no longer exist.
- Do not turn this repo into Photoshop, PowerPoint, Claude Design, or a broad animation studio UI.
- When a request is ambiguous, ask a focused question before building.

## Default Folders

- `{projects}/<name>/scripts/` — narration drafts for this project
- `{projects}/<name>/specs/` — creative direction specs for this project
- `{projects}/<name>/src/` — animation source code for this project
- `{projects}/<name>/props/` — render props JSON for this project
- `{projects}/<name>/assets/` — source assets scoped to this project
- `{projects}/<name>/output/` — rendered videos and stills for this project
- `{assets}/` — optional shared AnimationStudio asset library in Vault
- `{scripts}/` — optional shared AnimationStudio scripts area in Vault
- `packages/` — shared TypeScript packages (`@studio/*`)
- `references/` — external notes and research
