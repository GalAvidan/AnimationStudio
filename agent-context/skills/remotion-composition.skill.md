# Skill: Remotion Composition

## Purpose

Use Remotion to build inspectable animation projects from reviewed specs.

## Rules

- Register compositions in `src/Root.tsx`.
- Register the root from `src/index.ts`.
- Use `AbsoluteFill` for full-frame composition structure.
- Keep scene components in `src/scenes/`.
- Keep reusable visual components in `src/components/`.
- Derive timing from spec beats during build; do not put frame math in the spec.
- Keep composition IDs stable once a project has been rendered.

## Default Video Settings

- 1920x1080
- 30fps for drafts unless the spec says otherwise
- 60fps for final renders when motion clarity matters
