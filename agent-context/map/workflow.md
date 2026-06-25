# Workflow Map

## Lifecycle

0. **Resume existing project:** run `resume-project` task → reads `{projects}/<name>/status.md` and reports current phase + next action.
1. **Create project:** run `create-project` task → scaffolds `{projects}/<name>/` from `projects/_template/`. Pass `collection` to nest the project under a theme collection.
2. **Script:** for curriculum commissions, validate the linked v3.1 content
   brief and treatment guardrails, then use `create-script`; for standalone
   work, start from the user's idea.
3. **Spec:** run `create-spec` task → creates `{projects}/<name>/specs/<variant>.spec.md`.
4. **Audio plan** *(optional):* run `create-audio-plan` task → creates `{projects}/<name>/audio/plan.json` with voice profiles and music moods. Gate: user approval before any TTS runs.
5. **Generate narration** *(optional):* run `generate-narration` task → produces `audio/narration/*.wav` using Piper (or chosen engine). Hash-cached per beat.
6. **Align narration** *(optional):* run `align-narration` task → produces `audio/alignment/*.json` with word timestamps via faster-whisper.
7. **Select music & SFX** *(optional):* run `select-music-and-sfx` task → resolves track and SFX file refs from free sources.
8. **Compile timeline** *(optional):* run `compile-timeline` task → merges spec + audio into `audio/compiled.timeline.json`. Required before the composition can mount audio.
9. **Build:** run `build-animation` task → reads `project.config.ts`, loads adapter skills, builds `src/`. Reads `audio/compiled.timeline.json` if present.
10. **Preview:** run `pnpm --filter @studio/project-<name> dev` or use `preview` task.
11. **Render:** run `pnpm --filter @studio/project-<name> render -- --props=./props/<variant>.json` or use `render` task.
12. **Revise:** run `revise-animation` task → edits spec or code based on beat-level feedback.
13. **Archive:** run `archive-project` task when the project is complete or paused. Restore with `rehydrate-project`.

## Folder Routing

| Request | Load First | Work In | Output |
|---|---|---|---|
| Intake commission request | `agent-context/tasks/intake-commission-request.task.md` | `{exchange_inbox}` | Canonical request with receiver-assigned `request_id` + updated indexes |
| Emit commission response | `agent-context/tasks/emit-commission-response.task.md` | `{exchange_outbox}` | Response file + requester inbox mirror + updated indexes |
| Resume / Continue project | `agent-context/tasks/resume-project.task.md` | (read-only) | Resume briefing: phase, last session, next action |
| Update status / Refresh status | `agent-context/tasks/update-status.task.md` | `{projects}/<name>/status.md` | Updated status snapshot + history line |
| Record decision | `agent-context/tasks/record-decision.task.md` | `{projects}/<name>/decisions.md` | Append-only project decision entry |
| Capture project note | `agent-context/tasks/capture-project-note.task.md` | `{projects}/<name>/notes.md` | Append-only project learning note |
| Approve spec | `agent-context/tasks/approve-spec.task.md` | `{projects}/<name>/specs/<variant>.spec.md` | Spec status set to `Approved` with approver metadata |
| Create new project | `agent-context/tasks/create-project.task.md` | `{projects}/<name>/` | Scaffolded project |
| Create theme collection | `agent-context/tasks/create-collection.task.md` | `{projects}/<collection>/_theme/` | Theme package (`@studio/theme-<collection>`) |
| Create project in collection | `agent-context/tasks/create-project.task.md` (pass `collection` input) | `{projects}/<collection>/<name>/` | Scaffolded project wired to theme package |
| Turn idea or curriculum brief into script | `agent-context/tasks/create-script.task.md` | `{projects}/<name>/scripts/` | Traceable `<variant>.script.md` |
| Turn script into spec | `agent-context/tasks/create-spec.task.md` | `{projects}/<name>/specs/` | `<variant>.spec.md` |
| Create audio plan | `agent-context/tasks/create-audio-plan.task.md` | `{projects}/<name>/audio/` | `audio/plan.json` |
| Generate narration | `agent-context/tasks/generate-narration.task.md` | `{projects}/<name>/audio/narration/` | `<beatId>.wav` per beat |
| Align narration | `agent-context/tasks/align-narration.task.md` | `{projects}/<name>/audio/alignment/` | `<beatId>.json` per beat |
| Select music & SFX | `agent-context/tasks/select-music-and-sfx.task.md` | `{projects}/<name>/audio/` | Updated `plan.json` + files |
| Compile audio timeline | `agent-context/tasks/compile-timeline.task.md` | `{projects}/<name>/audio/` | `audio/compiled.timeline.json` |
| Build animation | `agent-context/tasks/build-animation.task.md` | `{projects}/<name>/src/` | Animation source files |
| Revise animation | `agent-context/tasks/revise-animation.task.md` | `{projects}/<name>/specs/` and `src/` | Updated spec or code |
| Preview | `agent-context/tasks/preview.task.md` | `{projects}/<name>/` | Running preview |
| Render | `agent-context/tasks/render.task.md` | `{projects}/<name>/` | `{projects}/<name>/output/<variant>.mp4` + `{projects}/<name>/output/<variant>.manifest.json` |
| Archive project | `agent-context/tasks/archive-project.task.md` | `Vault/hub/studios/AnimationStudio/archive/projects/<name>/` | Archived project tree + updated index |
| Restore from archive | `agent-context/tasks/rehydrate-project.task.md` | `{projects}/<name>/` | Restored project tree |
| Campaign-aware project | `agent-context/tasks/create-project.task.md` + `agent-context/skills/cross/campaign-resolution.skill.md` | `{projects}/<name>/` + `Vault/campaigns/{slug}/` | Scaffolded project with frozen campaign aliases |

## Adapter Resolution

1. Read `project.config.ts` in the project folder → get `adapter` field.
2. Look up the `adapter` row in `agent-context/map/adapter-registry.md`.
3. Load skills from the `skills dir` column.
4. Use `preview cmd` and `render cmd` from the registry verbatim (substitute `<name>` and `<variant>`).

## Current Projects

*(Updated by the `refresh-map` task as projects are added.)*

