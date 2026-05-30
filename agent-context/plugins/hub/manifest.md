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
  source_path: c:\Git\Vault\AnimationStudio\archive\projects
  read_mode: directory-index

blockers:
  source_path: c:\Git\AnimationStudio\CONTEXT.md
  read_mode: file

recent_activity:
  source_path: c:\Git\Vault\AnimationStudio\archive\projects
  read_mode: directory-index

bounds:
  max_files_per_query: 10
  max_lines_per_file: 150
  max_depth: 2

security:
  allow_paths:
    - c:\Git\AnimationStudio\CONTEXT.md
    - c:\Git\AnimationStudio\agent-context\intent\overview.md
    - c:\Git\AnimationStudio\agent-context\map\
    - c:\Git\Vault\AnimationStudio\archive\projects\
  deny_paths:
    - c:\Git\AnimationStudio\agent-context\intent\dependencies\
    - c:\Git\AnimationStudio\packages\
    - .git\
    - c:\Git\Vault\AnimationStudio\archive\projects\character-pilot\manifest\

confidence_rules:
  status_confidence: medium

notes: >
  AnimationStudio currently has no active projects; all prior work is archived at
  Vault/AnimationStudio/archive/projects/. Status is read from CONTEXT.md.
  Blockers are embedded in CONTEXT.md under "What To Avoid" and current-project notes.
  Active-project detection: look for folders under Vault/AnimationStudio/projects/ (not archive).
  When active projects exist, update current_work source_path to c:\Git\Vault\AnimationStudio\projects\.
---
