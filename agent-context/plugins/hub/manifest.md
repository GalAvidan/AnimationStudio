---
plugin_id: hub
manifest_version: 1.0.0
studio_id: animation-studio
studio_name: AnimationStudio
project_root_alias: "{projects}"

status:
  source_path: c:\Git\AnimationStudio\CONTEXT.md
  read_mode: file

current_work:
  source_path: c:\Git\Vault\AnimationStudio\projects
  read_mode: directory-index
  empty_note: "No active projects. All prior work is archived at Vault/AnimationStudio/archive/projects/."

blockers:
  source_path: c:\Git\AnimationStudio\CONTEXT.md
  read_mode: file

recent_activity:
  source_path: c:\Git\Vault\AnimationStudio\projects
  read_mode: directory-index
  empty_note: "No recent activity. Check Vault/AnimationStudio/archive/projects/ for archived work."

bounds:
  max_files_per_query: 10
  max_lines_per_file: 150
  max_depth: 2

security:
  allow_paths:
    - c:\Git\AnimationStudio\CONTEXT.md
    - c:\Git\AnimationStudio\agent-context\intent\overview.md
    - c:\Git\AnimationStudio\agent-context\map\
    - c:\Git\Vault\AnimationStudio\projects\
    - c:\Git\Vault\AnimationStudio\archive\projects\
  deny_paths:
    - c:\Git\AnimationStudio\agent-context\intent\dependencies\
    - c:\Git\AnimationStudio\packages\
    - .git\
    - c:\Git\Vault\AnimationStudio\archive\projects\character-pilot\manifest\

confidence_rules:
  status_confidence: medium

notes: >
  current_work and recent_activity read from Vault/AnimationStudio/projects/ (the live content root).
  When that folder is empty, Hub should report "no active projects" and point to the archive.
  Archive path: Vault/AnimationStudio/archive/projects/.
  Status and blockers are read from CONTEXT.md.
---
