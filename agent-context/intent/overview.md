# AnimationStudio Overview

AnimationStudio is a workflow-first repository for turning explanations into short, clear animations. The value is in the repeatable creative process, not in a custom design UI.

Content ownership split:
- AnimationStudio repository: framework logic, templates, tasks, maps, packages.
- Vault repository: project content resolved through `agent-context/intent/dependencies/vault.md` aliases.

## Purpose

Help move from an idea or rough explanation to a reviewed animation spec, then to an animation project that can be previewed, revised, and rendered.

## Core Workflow

Script -> Spec -> Build -> Preview -> Render -> Revise

## Principles

- The script says what needs to be explained.
- The spec is the contract between explanation and visuals.
- The animation project is generated from the reviewed spec.
- The output is a video or still derived from the project.
- Revisions should refer to beats, timestamps, visual intent, or scene names.

## Adapters

Rendering adapters are interchangeable. `project.config.ts` in each project selects the adapter via the `adapter` field. Agents look up the adapter row in `agent-context/map/adapter-registry.md` to find the correct skills directory, preview command, and render command.

- **Motion Canvas** (MIT) — default for new 2D projects. Generator-based timelines map cleanly to the beat/sync model. Best for character animation, branded explainers, and UI walkthroughs.
- **Manim CE** (MIT) — Python-based mathematical and scientific animation. Best for: equations, algorithm visualization, 3D diagrams, and geometric constructions. Uses `uv` for dependency management; projects live outside the pnpm workspace.
- **Remotion** (Remotion license) — retained for existing projects only. No new projects should use Remotion.
- Three.js and in-house adapters are planned for Plan 3.

Use `agent-context/skills/adapter-selection.skill.md` when choosing an adapter for a new project.

## Agent Behavior

- Load only the context needed for the current request.
- Ask when creative intent is missing.
- Keep human-authored artifacts readable.
- Do not skip the spec step for non-trivial animations.
- Do not bury important creative decisions in code.
