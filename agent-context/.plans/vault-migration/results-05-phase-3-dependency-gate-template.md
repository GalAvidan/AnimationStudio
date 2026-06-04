# Results 05 - Phase 3 Dependency Gate Decision Template

Date: 2026-05-29
Status: proposed decision (NO-GO until owner sign-off and blockers cleared)

## Gate Metadata

- Decision owner: TBD (AnimationStudio migration owner)
- Technical approver: TBD
- Date decided (YYYY-MM-DD): pending
- Effective date: pending
- Sign-off note: pending owner approval

## Scope

Migration target projects validated by this gate:
- `character-pilot`
- `mathematical-theorems/pythagorean-theorem`

## Candidate Strategy Comparison (Required)

| Strategy | Install works from Vault location | Typecheck | Build | Preview | Render | CI complexity | Rollback cost | Decision |
|---|---|---|---|---|---|---|---|---|
| Publish `@studio/*` packages to registry and consume versions | ☑ | ☐ | ☑ | ☑ | ☑ | medium | medium | keep (recommended) |
| Approved monorepo/path-link model that works from Vault | ☐ | ☐ | ☐ | ☐ | ☐ | high | low | drop |
| Other (documented) | ☐ | ☐ | ☐ | ☐ | ☐ | unknown | unknown | drop |

Chosen strategy: publish `@studio/*` packages to a registry and consume pinned versions from Vault-hosted projects.
Rationale: decouples Vault content projects from AnimationStudio workspace-only links and keeps Studio framework-first.
Rejected alternatives and why: path-link/dual-monorepo linking is brittle across repos and increases CI/environment drift risk.

## Workspace/CI Rules (Both Repos)

### AnimationStudio (framework repo)
- Package ownership: owns `@studio/*` packages, templates, adapter logic, and context orchestration.
- Publish/build responsibilities: build and publish internal packages consumed by Vault content projects.
- CI checks: package build, lint, typecheck, publish-readiness checks.

### Vault (content repo)
- Project ownership: owns migrated project content and shared content assets.
- Dependency acquisition model: consume published `@studio/*` versions; avoid `workspace:*` in migrated project manifests.
- CI checks: install, typecheck, build/preview/render validations on representative projects.

## Representative Validation Checklist (Required Green)

Representative project: `character-pilot`
Test location (Vault-like path): not yet executed (current run validated in AnimationStudio workspace)

- [x] install
- [ ] typecheck
- [x] build
- [x] preview
- [x] render
- [ ] task execution against alias-based paths

Validation artifacts:
- command log path: this migration run terminal evidence (2026-05-29)
- build output path: `projects/character-pilot/dist/src/project-ComWapbE.js`
- render output path: motion-canvas registry render cmd maps to build; same output path

## Hard Block Decision

- [ ] Gate approved for Phase 5 pilot physical migration
- [x] Gate not approved (physical migration remains blocked)

If not approved, smallest next safe fix:
- fix owner: AnimationStudio migration owner + package maintainers
- target date: pending owner assignment
- blocking issue: representative typecheck fails (`Cannot find module '@studio/spec-types'` and no project `typecheck` script); no Vault-like location validation yet

## Cross-Platform Contract Decision Record

Canonical decision location: `agent-context/intent/decisions/`
Decision owner: AnimationStudio migration owner (TBD)
Decision status: Windows-only for now
Reasoning: contract values and current workspace assumptions are Windows-native; cross-platform expansion remains a separate decision.
