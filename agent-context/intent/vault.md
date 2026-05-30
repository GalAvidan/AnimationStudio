vaultRoot: c:\Git\Vault
studioName: AnimationStudio

{projects}: {vaultRoot}\{studioName}\projects
{assets}: {vaultRoot}\{studioName}\assets
{scripts}: {vaultRoot}\{studioName}\scripts

Notes:
- Use Windows-native separators in alias values.
- Keep framework paths local to AnimationStudio (`agent-context/`, `packages/`, `projects/_template/`, `projects/_template-motion-canvas/`, `references/`).
- `{scripts}` is optional for shared scripts; project-local scripts stay under each Vault project folder.