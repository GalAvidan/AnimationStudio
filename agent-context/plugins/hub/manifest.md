---
plugin_id: hub
manifest_version: 1.0.0
studio_id: animation-studio
studio_name: AnimationStudio
project_root_alias: "{projects}"

status:
  source_path: Studios/AnimationStudio/context.md
  read_mode: file

current_work:
  source_path: Vault/studios/AnimationStudio/projects
  read_mode: directory-index
  empty_note: "No active projects. All prior work is archived at Vault/studios/AnimationStudio/archive/projects/."

blockers:
  source_path: Studios/AnimationStudio/context.md
  read_mode: file

recent_activity:
  source_path: Vault/studios/AnimationStudio/projects
  read_mode: directory-index
  empty_note: "No recent activity. Check Vault/studios/AnimationStudio/archive/projects/ for archived work."

bounds:
  max_files_per_query: 10
  max_lines_per_file: 150
  max_depth: 2

security:
  allow_paths:
    - Studios/AnimationStudio/context.md
    - Studios/AnimationStudio/agent-context/intent/overview.md
    - Studios/AnimationStudio/agent-context/map/
    - Vault/studios/AnimationStudio/projects/
    - Vault/studios/AnimationStudio/archive/projects/
  deny_paths:
    - Studios/AnimationStudio/agent-context/intent/dependencies/
    - Studios/AnimationStudio/packages/
    - .git\
    - Vault/studios/AnimationStudio/archive/projects/character-pilot/manifest/

confidence_rules:
  status_confidence: medium

notes: >
  current_work and recent_activity read from Vault/studios/AnimationStudio/projects/ (the live content root).
  When that folder is empty, Hub should report "no active projects" and point to the archive.
  Archive path: Vault/studios/AnimationStudio/archive/projects/.
  Status and blockers are read from context.md.
---

