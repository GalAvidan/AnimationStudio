# Context Profiles

Use the minimal profile by default. Escalate only when you confirm a gap.

See `ALES/token-efficiency-playbook.md` for the full repo-wide rules.

---

## minimal (~400 tokens, 3 files)

**When:** First message in a session, status check, quick question, session continuation.

Load in order:
1. `agent-context/intent/dependencies/vault.md` — alias resolution (`{projects}`, `{assets}`, `{scripts}`)
2. `agent-context/intent/overview.md` — studio purpose, workflow, principles
3. `agent-context/intent/anti-goals-brief.md` — what to refuse (5 bullets)

Do **not** load `workflow.md`, skills, or tasks until the request type is confirmed.

---

## task (~1 500 tokens, 6–8 files)

**When:** The workflow task is known (create, resume, build, render, revise, archive).

Load in order:
1. Everything from `minimal`
2. `agent-context/map/workflow.md` — phase routing (Script → Spec → Build → Preview → Render → Revise)
3. `agent-context/tasks/<matching-task>.task.md` — task definition
4. Each skill file named in the task's `Skills:` block
5. `agent-context/map/adapter-registry.md` — only if the adapter is unknown
6. `agent-context/intent/conventions.md` — only if creating or renaming files

Stop here for most work.

---

## full (~5 000+ tokens, all agent-context)

**When:** Auditing, debugging the framework, generating a new skill or task, architecture review.

Load all `agent-context/`. Use `agent-context/map/skills-index.md` to decide which skill files matter before reading them all.

---

## Quick-select table

| Request | Profile | Extra files |
|---|---|---|
| What is the current project status? | minimal | + `{projects}/<name>/status.md` |
| Resume a project | task | `resume-project.task.md` |
| Create a new project | task | `create-project.task.md` + `adapter-registry.md` |
| Write / revise a script | task | `create-script.task.md` or `revise-animation.task.md` |
| Build from spec | task | `build-animation.task.md` + adapter skills |
| Render output | task | `render.task.md` |
| Archive a project | task | `archive-project.task.md` |
| Generate a new skill | full | — |
| Audit context for staleness | full | + `ALES/skills/reference/verify-context-freshness.skill.md` |
