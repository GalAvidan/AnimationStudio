# Results 07 - Phase 3 Dependency Gate Decision (Execution Evidence)

Date: 2026-05-29
Workspace commit: e371b38
Validation timestamp: 2026-05-29 00:11:59 +03:00

## Decision Summary

Gate verdict: NO-GO for Phase 5 physical pilot migration.

Reason:
- Typecheck is not green for the representative project.
- Validation has not yet been executed from a Vault-like location.
- Owner/approver sign-off remains pending.

## Strategy Decision (Proposed)

Chosen model: publish `@studio/*` packages to a registry and consume pinned versions from Vault-hosted projects.

Why this model:
- Keeps AnimationStudio framework-first and Vault content-first.
- Removes cross-repo `workspace:*` coupling risk during physical migration.
- Supports independent CI behavior per repo with explicit version control.

## Representative Validation Run

Representative project: `@studio/project-character-pilot`
Location tested: `c:/Git/AnimationStudio` (not Vault-like)

Checks:
- install: PASS
  - command: `pnpm install`
- typecheck: FAIL
  - command: `pnpm --filter @studio/project-character-pilot exec tsc --noEmit`
  - evidence: `Cannot find module '@studio/spec-types'` and `Command "tsc" not found`
- build: PASS
  - command: `pnpm --filter @studio/project-character-pilot build`
  - evidence output: `projects/character-pilot/dist/src/project-ComWapbE.js`
- preview: PASS (startup)
  - command: `pnpm --dir c:/Git/AnimationStudio --filter @studio/project-character-pilot dev`
  - evidence: local URL reported `http://localhost:9000/`
- render: PASS (registry-equivalent)
  - command (motion-canvas render cmd): `pnpm --filter @studio/project-character-pilot build`
  - evidence output: `projects/character-pilot/dist/src/project-ComWapbE.js`
- task execution against alias-based paths: NOT RUN

## Smallest Safe Fix to Unblock Gate

1. Add an explicit `typecheck` script to all migration-scope project manifests and run it green.
2. Resolve internal package type resolution for representative project (`@studio/spec-types`) under the chosen dependency model.
3. Run the same checklist from a Vault-like project location with the approved dependency model.
4. Record owner + technical approver sign-off in the Phase 3 decision document.

## Required Next Evidence Before Re-evaluating Gate

- green install/typecheck/build/preview/render in Vault-like location
- command log references and outputs attached
- approved sign-off metadata
