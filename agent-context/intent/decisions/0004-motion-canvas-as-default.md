# Decision 0004: Motion Canvas as Default Adapter

## Status

Accepted

## Context

ADR 0002 chose Remotion for V1. Since then:

- `packages/adapter-motion-canvas` was added to the workspace.
- Four Motion Canvas skills were written (`composition`, `scene`, `tweening`, `character-rig`), covering the full authoring surface.
- `projects/_template-motion-canvas/` was added as the canonical scaffold.
- The adapter registry lists `motion-canvas` as the row with `adapter-motion-canvas` package and MIT license; Remotion remains `stable` but requires a Remotion license for commercial use.

The default adapter in `create-project` was never formally updated after these additions. Agents defaulting to Remotion produce projects that require a commercial license and load a skill set with only one file (composition.skill.md), while Motion Canvas is fully covered and MIT-licensed.

## Decision

Set `motion-canvas` as the default adapter for `create-project`. Remotion remains a fully supported, stable adapter and should be used when explicitly requested.

The canonical scaffold for new projects is `projects/_template-motion-canvas/`.

## Consequences

- `create-project` task defaults `adapter` to `motion-canvas`.
- Agents should not prompt for the adapter unless the user specifies otherwise.
- Remotion projects are created on explicit request; the adapter is fully supported and documented.
- The skill gap in the Remotion adapter (one skill vs four for Motion Canvas) is acceptable for the current scope — see note in `skills/adapters/remotion/composition.skill.md`.
