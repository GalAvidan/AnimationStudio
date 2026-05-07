# Decision 0002: Use Remotion for V1

## Status

Accepted

## Context

AnimationStudio needs a practical render stack that works inside VS Code and supports code-generated video.

## Decision

Use Remotion for v1 builds and renders.

## Consequences

- Animations are React components rendered to video.
- Agents can inspect and edit animation code directly.
- The repo can support preview, revision, and final render without building a custom editor.
