---
plugin_id: hub
manifest_version: 1.0.0
studio_id: animation-studio
studio_name: AnimationStudio
project_root_alias: "{projects}"

status:
  source_path: AnimationStudio/context.md
  read_mode: file

current_work:
  source_path: Vault/AnimationStudio/projects
  read_mode: directory-index
  empty_note: "No active projects. All prior work is archived at Vault/AnimationStudio/archive/projects/."

blockers:
  source_path: AnimationStudio/context.md
  read_mode: file

recent_activity:
  source_path: Vault/AnimationStudio/projects
  read_mode: directory-index
  empty_note: "No recent activity. Check Vault/AnimationStudio/archive/projects/ for archived work."

bounds:
  max_files_per_query: 10
  max_lines_per_file: 150
  max_depth: 2

security:
  allow_paths:
    - AnimationStudio/context.md
    - AnimationStudio/agent-context/intent/overview.md
    - AnimationStudio/agent-context/map/
    - Vault/AnimationStudio/projects/
    - Vault/AnimationStudio/archive/projects/
  deny_paths:
    - AnimationStudio/agent-context/intent/dependencies/
    - AnimationStudio/packages/
    - .git\
    - Vault/AnimationStudio/archive/projects/character-pilot/manifest/

confidence_rules:
  status_confidence: medium

notes: >
  current_work and recent_activity read from Vault/AnimationStudio/projects/ (the live content root).
  When that folder is empty, Hub should report "no active projects" and point to the archive.
  Archive path: Vault/AnimationStudio/archive/projects/.
  Status and blockers are read from context.md.
---
