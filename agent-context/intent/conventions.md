# Conventions

## Naming

- Scripts: `scripts/<project-name>_script.md`
- Specs: `specs/<project-name>_spec.md`
- Remotion projects: `projects/<project-name>/`
- Source assets: `assets/<project-name>/<asset-name>`
- Rendered videos: `output/<project-name>.mp4`
- Rendered stills: `output/<project-name>_<timestamp-or-frame>.png`

Use lowercase kebab-case for project names, for example `how-tokens-work`.

## Specs

Specs should include:

- Goal and audience
- Runtime target
- Beat map
- Visual philosophy
- Key moments
- Audio or narration sync points
- Asset notes
- Constraints
- Review checklist

Specs should not include:

- Code
- Component props
- Pixel positions
- Frame numbers
- Low-level implementation details

## Remotion Projects

Each Remotion project should keep code organized by role:

- `src/Root.tsx` registers compositions.
- `src/index.ts` registers the Remotion root.
- `src/compositions/` contains composition entry components.
- `src/scenes/` contains scene-level components.
- `src/components/` contains reusable visual components.
- `src/data/` contains derived timing or copy data.

## Assets

For SVG and layered assets, use descriptive IDs and layer names:

- Characters: `<character>_<part>_<side>`, for example `hero_eye_left`.
- Scenes: `<layer>_<element>_<number>`, for example `bg_grid_01`.
- Audio markers: use names that match spec beats, for example `product-visible`.
