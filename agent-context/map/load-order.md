# Load Order — Common Workflows

Exact file sequences for the 4 most common AnimationStudio workflows.
Use these instead of reading broadly from agent-context/.

---

## 1. Resume an existing project

```
agent-context/intent/dependencies/vault.md
agent-context/intent/overview.md
agent-context/map/workflow.md
agent-context/tasks/resume-project.task.md
{projects}/<name>/status.md
```

Then load only the skills the resumed task needs.

---

## 2. Start a new project

```
agent-context/intent/dependencies/vault.md
agent-context/intent/overview.md
agent-context/map/workflow.md
agent-context/tasks/create-project.task.md
agent-context/map/adapter-registry.md
```

---

## 3. Continue an active task (build / spec / render / revise)

```
agent-context/intent/dependencies/vault.md
agent-context/tasks/<matching-task>.task.md
```

Then load each skill file the task lists in its `Skills:` block. Nothing else.

---

## 4. Archive or handoff

```
agent-context/intent/dependencies/vault.md
agent-context/intent/overview.md
agent-context/tasks/archive-project.task.md
```

For campaign handoff also load: `agent-context/intent/dependencies/campaign.md`

---

_See `agent-context/intent/context-profiles.md` for file-count and token estimates._
