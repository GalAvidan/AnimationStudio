# Task: Create Script

## Use When

The user has an idea, rough notes, or a transcript and wants a script for an explanatory animation.

## Load

1. Load `agent-context/intent/dependencies/vault.md`.
- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/core/visual-clarity.skill.md`
- `agent-context/skills/core/narrative-structure.skill.md`

## Steps

1. Identify the audience and the one idea the viewer must remember.
2. Draft a concise script in plain language.
3. Mark likely visual beats without specifying implementation details.
4. For narrative projects (2+ characters speaking), use `[SPEAKER: <character-id>]` to attribute lines, and `[TRANSITION: fade <duration>]` for explicit scene boundaries. See `narrative-structure.skill.md`.
5. Save to `{projects}/<name>/scripts/<variant>.script.md` using `agent-context/templates/script.template.md` as the skeleton.
6. As the final step, call `update-status` to record:
	- `phase`: `scripted`
	- variant update: `scripted = yes` for `<variant>`
	- `next action`: "Create a spec draft from the script"
	- `session summary`: one-line script progress note.

## Ask If Missing

- Project name and variant (if the project already exists)
- Target audience
- Desired runtime
- Tone or level of technical depth
- For narrative projects: the cast (character ids and labels)

## Output

A readable script file at `{projects}/<name>/scripts/<variant>.script.md`, ready to become a spec.
