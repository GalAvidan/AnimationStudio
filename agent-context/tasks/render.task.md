# Task: Render

## Use When

The user wants a video or still export.

## Load

- `agent-context/skills/remotion-composition.skill.md`
- The relevant spec in `specs/`

## Steps

1. Confirm composition ID, output format, and destination.
2. Go to `projects/<project-name>/`.
3. Run a Remotion render command.
4. Put final files in `output/`.
5. Avoid inline JSON props on Windows; use props files when needed.

## Output

A rendered video or still in `output/`.
