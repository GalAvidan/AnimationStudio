# Task: Render

## Use When

The user wants a video or still export.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
2. Read `project.config.ts` to determine `adapter` and `variants`.
3. Look up the adapter row in `agent-context/map/adapter-registry.md`.
3. Load all skills in `agent-context/skills/adapters/<adapter>/`.
4. Load the relevant spec from `{projects}/<name>/specs/<variant>.spec.md`.

## Steps

1. Read `{projects}/<name>/project.config.ts` to get composition ID, output path, and adapter.
2. From the adapter registry, get the `render cmd` for this adapter.
3. Confirm `{projects}/<name>/props/<variant>.json` exists and contains valid props.
4. Run from the repo root the `render cmd` from the adapter registry row, substituting `<name>` and `<variant>`.
5. Verify the output file at `{projects}/<name>/output/<variant>.mp4`.
6. Write render provenance to `{projects}/<name>/output/<variant>.manifest.json` with:
	- `project`: `<name>`
	- `variant`: `<variant>`
	- `adapter`: adapter from `project.config.ts`
	- `specPath`: `specs/<variant>.spec.md`
	- `propsPath`: `props/<variant>.json`
	- `outputPath`: `output/<variant>.mp4`
	- `renderCommand`: expanded command used for the run
	- `renderedAt`: ISO timestamp
	- `status`: `success` or `failed`
	- `gitSha`: current commit SHA when available
7. As the final step, call `update-status` to record:
	- `phase`: `rendered`
	- variant update: `rendered = yes` for `<variant>`
	- run outcome:
	  - `lastRenderStatus`: `success` or `failed`
	  - `lastRenderOutput`: `output/<variant>.mp4` on success
	  - `lastRenderManifest`: `output/<variant>.manifest.json`
	- `next action`: "Review output and decide whether revisions are needed"
	- `session summary`: one-line render result note.

## Ask If Missing

- Project name and variant
- Output format if not mp4

## Output

- Rendered video at `{projects}/<name>/output/<variant>.mp4`.
- Render provenance at `{projects}/<name>/output/<variant>.manifest.json`.
