# References

## Inspiration

- Skool animation workflow reference: script -> spec -> build -> render.
- Skool folder architecture reference: map -> rooms -> tools.
- ALES model in this workspace: `../ALES/README.md`.

## Remotion

- Remotion docs: https://www.remotion.dev/docs/
- Create a project: `npx create-video@latest --yes --blank <project-name>`
- Start preview: `npm run dev`
- Render: `npx remotion render <entry-point> <composition-id> <output>`

## Notes

- On Windows, avoid inline JSON props in shell commands. Use a props JSON file when render props are needed.
- Specs should describe creative direction, not low-level implementation details.
