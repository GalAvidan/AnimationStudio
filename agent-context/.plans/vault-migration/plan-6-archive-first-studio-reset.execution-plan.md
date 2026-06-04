# Plan 6 Detailed Execution Plan: Archive-First Studio Reset

- Date: 2026-05-29
- Parent Plan: `plan-6-archive-first-studio-reset.md`
- Status: Ready for execution after owner assignment
- Objective: Execute an archive-first reset of AnimationStudio with recoverable project history, a single canonical archive model, and explicit reintroduction gates.

## 1) Scope Decisions (Locked)

### 1.1 Canonical Archive Topology

Use one and only one archive topology:

- `Vault/AnimationStudio/archive/projects/<project-slug>/`

Inside each project slug:

- `markdown/` for migrated markdown records
- `manifest/` for metadata and checksums
- `notes/` for archive-only comments and mapping notes

No parallel typed global trees (`specs/`, `plans/`, `notes/`) and no mixed fallback topology.

### 1.2 Artifact Preservation Policy

Archive policy per project:

- Required archive artifacts:
  - All project markdown records (`*.md`)
  - Structure manifest (`manifest/archive-manifest.json`)
  - Rehydration map (`manifest/rehydration-map.md`)
  - Integrity hashes (`manifest/checksums.sha256`)
- Not archived (rebuilt on reintroduction):
  - `node_modules/`, build outputs, cache/temp artifacts
  - generated media previews that can be reproduced from source
- Conditional archive artifacts:
  - project source files and assets if they are needed to preserve reproducibility or legal traceability

Rule: If a project cannot be reintroduced from markdown + deterministic regeneration steps, include minimum source/assets required to make reintroduction feasible.

### 1.3 Active Surface Contract

After Phase 2, active AnimationStudio contains only:

- framework and shared packages
- templates and project scaffolding tools
- migration and archive pointers
- no legacy active project tree

## 2) Roles and Ownership

- Migration Owner: accountable for phase sign-off and rollback decisions
- Archive Curator: accountable for archive integrity, manifests, and discoverability
- Studio Maintainer: accountable for active default load path and root docs
- Project Rehydration Owner: accountable per project during reintroduction

If one person fills multiple roles, role responsibilities still apply as separate checklists.

## 3) Phase-by-Phase Execution

## Phase 0 - Snapshot and Inventory

### Inputs

- Current AnimationStudio project tree
- Existing migration docs in `agent-context/.plans/VaultMigration/`

### Actions

1. Generate project inventory with per-project file counts by type.
2. Classify every markdown file:
   - `active-guidance`
   - `project-reference`
   - `historical-archive-only`
3. Identify non-markdown files required for later reintroduction.
4. Produce initial project slug list and canonical archive destinations.

### Deliverables

- `results-08-phase-0-archive-inventory.md`
- `results-09-phase-0-project-artifact-policy.md`

### Exit Criteria

- 100% of target projects listed
- 100% of project markdowns classified
- any non-markdown retention needs explicitly documented

## Phase 1 - Archive Construction and Migration

### Actions

1. Create canonical archive directories:
   - `Vault/AnimationStudio/archive/projects/<project-slug>/markdown/`
   - `Vault/AnimationStudio/archive/projects/<project-slug>/manifest/`
   - `Vault/AnimationStudio/archive/projects/<project-slug>/notes/`
2. Move/copy project markdown records into each `markdown/` folder.
3. Write per-project `manifest/archive-manifest.json` with:
   - source path
   - archive path
   - classification
   - migrated timestamp
4. Generate `manifest/checksums.sha256` for archived files.
5. Write `manifest/rehydration-map.md` describing how each markdown record maps to future active structure.
6. Create an index at:
   - `Vault/AnimationStudio/archive/ARCHIVE_INDEX.md`

### Deliverables

- archive tree populated
- per-project manifests, checksums, and rehydration maps
- global archive index

### Exit Criteria

- all targeted markdown files present in archive
- checksum file exists for each project archive
- archive index references every project slug exactly once

## Phase 2 - Active Studio Reset

### Actions

1. Remove legacy active project folders from AnimationStudio active tree.
2. Establish framework-first active layout.
3. Update root routing and load instructions.
4. Add explicit archive pointer document in active Studio root:
   - `archive_pointer.md`

### Default Load Path Decision (Required)

Define and update one canonical entry path that is loaded by default for Studio operations.

- Controlling location: root guidance document(s) used at startup
- Required update owner: Studio Maintainer
- Required verification: startup instructions resolve to framework-first surface, not legacy project paths

### Deliverables

- active tree reset complete
- default load path update completed and documented

### Exit Criteria

- no legacy project directories remain active
- default load path points to framework-first structure
- archive pointer file exists and links to archive index

## Phase 3 - Project Reintroduction Pipeline

### Reintroduction Unit

One project at a time only.

### Actions per Project

1. Select project slug from archive index.
2. Read `rehydration-map.md` and `archive-manifest.json`.
3. Adapt project to new structure under active Studio conventions.
4. Run project validation gate:
   - dependency install
   - typecheck/lint (if applicable)
   - dev/preview start
   - render/test path smoke check
5. Publish project reintroduction report.

### Deliverables per Project

- `results-10-reintro-<project-slug>.md`

### Exit Criteria per Project

- project passes validation gate
- no dependency on legacy layout assumptions remains
- report includes reused vs rewritten vs retired artifacts

## Phase 4 - Stabilization and Governance

### Actions

1. Create archive governance rules:
   - archive is reference-only
   - active workspace is operational source of truth
2. Document conversion rules from archive to active structure.
3. Add change log for rehydration outcomes.

### Deliverables

- `results-11-archive-governance.md`
- `results-12-archive-to-active-conversion-rules.md`

### Exit Criteria

- governance and conversion documents approved
- all completed reintroductions recorded consistently

## 4) Verification Matrix

| Check | Phase | Owner | Pass Condition |
|---|---|---|---|
| Inventory completeness | 0 | Migration Owner | All target projects and markdown records are listed and classified |
| Archive integrity | 1 | Archive Curator | Checksums present and index is complete |
| Active reset correctness | 2 | Studio Maintainer | No legacy project tree; default load path updated |
| Reintroduction quality | 3 | Rehydration Owner | Project validates without legacy-layout dependence |
| Governance closure | 4 | Migration Owner | Rules and conversion process documented and adopted |

## 5) Rollback Rules

- Rollback trigger A: archive integrity failure (missing files, checksum mismatch)
- Rollback trigger B: active reset breaks default load behavior
- Rollback trigger C: reintroduced project requires legacy layout to function

Rollback action:

1. Stop progression to next phase/project.
2. Restore from last verified phase checkpoint.
3. Record incident and corrective action in the relevant results file.

## 6) Acceptance Criteria (Operationalized)

1. Existing project markdown files are archived and recoverable.
   - Verified by archive index coverage plus checksum validation.
2. Active AnimationStudio no longer contains legacy project tree.
   - Verified by active tree inventory after Phase 2.
3. New Studio structure is documented and loaded by default.
   - Verified by explicit default load path control update and startup check.
4. One project can be reintroduced without legacy assumptions.
   - Verified by first successful Phase 3 reintroduction report.
5. Archive remains clearly separated from active work.
   - Verified by directory boundaries and governance rule adoption.

## 7) Immediate Next Actions

1. Assign named owners to the four roles.
2. Execute Phase 0 and publish `results-08` and `results-09`.
3. Create archive scaffolding for one pilot project slug and validate manifest/checksum workflow before bulk migration.