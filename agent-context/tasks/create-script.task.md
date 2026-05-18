# Task: Create Script

## Use When

The user has an idea, rough notes, or a transcript and wants a script for an explanatory animation.

## Load

- `agent-context/intent/overview.md`
- `agent-context/intent/conventions.md`
- `agent-context/skills/core/visual-clarity.skill.md`

## Steps

1. Identify the audience and the one idea the viewer must remember.
2. Draft a concise script in plain language.
3. Mark likely visual beats without specifying implementation details.
4. Save to `projects/<name>/scripts/<variant>.script.md` using `agent-context/templates/script.template.md` as the skeleton.

## Ask If Missing

- Project name and variant (if the project already exists)
- Target audience
- Desired runtime
- Tone or level of technical depth

## Output

A readable script file at `projects/<name>/scripts/<variant>.script.md`, ready to become a spec.
