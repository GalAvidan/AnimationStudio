# AnimationStudio Agent Guide

This repository is an agent-assisted workflow for creating explanatory animations. It is not a general-purpose design application.

## First Read

Before doing project work, load these files in order:

1. `agent-context/intent/overview.md`
2. `agent-context/map/workflow.md`
3. `agent-context/intent/conventions.md`
4. Any task file in `agent-context/tasks/` that matches the user's request
5. Any skill file in `agent-context/skills/` referenced by that task

## Operating Rules

- Treat `agent-context/` as the canonical source of truth.
- Treat this file as an adapter, not an independent rulebook.
- Keep scripts and specs human-editable.
- Prefer the workflow: Script -> Spec -> Build -> Preview -> Render -> Revise.
- Ask before creating files outside the documented folders.
- Do not turn this repo into Photoshop, PowerPoint, Claude Design, or a broad animation studio UI.
- When a request is ambiguous, ask a focused question before building.

## Default Folders

- `scripts/` stores source explanations, rough notes, and narration drafts.
- `specs/` stores creative direction specs.
- `projects/` stores Remotion projects.
- `assets/` stores source assets, SVGs, audio, fonts, and references.
- `output/` stores rendered videos and stills.
- `references/` stores external notes and research material.
