# Dependencies

This repo depends on the following external repos and systems.
Load this file before any cross-repo task, then load the specific dependency file for the repo you need.

| Dependency | Type | Direction | Purpose | Notes |
|---|---|---|---|---|
| [vault](vault.md) | `repo` | `reads-from` | Content store for all produced projects, assets, and scripts | always load |
| [campaign](campaign.md) | `repo` | `reads-from` | Campaign manifest, shared resources, handoff read path | optional — load when project declares `campaign` field |
| [curriculum-studio](curriculum-studio.md) | `contract` | `receives-from` | Closed lesson-content briefs for curriculum commissions | load for commissioned curriculum work |
