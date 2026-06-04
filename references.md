# References

## Inspiration

- Skool animation workflow reference: script → spec → build → render.
- Skool folder architecture reference: map → rooms → tools.
- ALES model in this workspace: `../ALES/README.md`.

## Remotion

- Remotion docs: https://www.remotion.dev/docs/
- Create a project from the template: copy `projects/_template/`, edit `project.config.ts`, run `pnpm install`.
- Start preview: `pnpm --filter ./projects/<name> dev`
- Render: `pnpm --filter ./projects/<name> render -- --props=./props/<variant>.json`

## Package Manager

- This workspace uses **pnpm >= 9** exclusively. Never `npm`, `yarn`, or `npx`.
- Workspace packages are under `packages/` (scope `@studio/`).
- Projects are under `projects/` (self-contained, each with its own `package.json`).

## Notes

- On Windows, avoid inline JSON props in shell commands. Always pass props via a JSON file.
- Specs describe creative direction, not low-level implementation details.
- `project.config.ts` is the single routing source for all agents and tasks within a project.
