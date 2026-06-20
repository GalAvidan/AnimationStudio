# Vault

Content store for AnimationStudio projects, assets, and scripts.

## Paths

vaultRoot: c:\Git\Vault
studioName: AnimationStudio

{projects}: {vaultRoot}\studios\{studioName}\projects
{assets}: {vaultRoot}\studios\{studioName}\assets
{scripts}: {vaultRoot}\studios\{studioName}\scripts
{exchange_inbox}: {vaultRoot}\studios\exchange\{studioName}\inbox
{exchange_outbox}: {vaultRoot}\studios\exchange\{studioName}\outbox
{exchange_indexes}: {vaultRoot}\studios\exchange\_indexes
{exchange_schemas}: {vaultRoot}\studios\exchange\_schemas

## Rules

- Use Windows-native separators in alias values.
- Keep framework paths local to AnimationStudio (`agent-context/`, `packages/`, `projects/_template/`, `projects/_template-motion-canvas/`, `references/`).
- `{scripts}` is optional for shared scripts; project-local scripts stay under each Vault project folder.
- Use `{exchange_inbox}` and `{exchange_outbox}` for file-based commission request-response queues.
- Load this file before any task that reads or writes `{projects}`, `{assets}`, or `{scripts}` paths.
