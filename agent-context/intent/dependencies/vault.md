# Vault

Content store for AnimationStudio projects, assets, and scripts.

## Paths

vaultRoot: c:\Git\Vault
studioName: AnimationStudio

{projects}: {vaultRoot}\{studioName}\projects
{assets}: {vaultRoot}\{studioName}\assets
{scripts}: {vaultRoot}\{studioName}\scripts

## Rules

- Use Windows-native separators in alias values.
- Keep framework paths local to AnimationStudio (`agent-context/`, `packages/`, `projects/_template/`, `projects/_template-motion-canvas/`, `references/`).
- `{scripts}` is optional for shared scripts; project-local scripts stay under each Vault project folder.
- Load this file before any task that reads or writes `{projects}`, `{assets}`, or `{scripts}` paths.
