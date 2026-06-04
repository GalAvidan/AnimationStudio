# Skill: Revision Workflow

## Purpose

Make animation edits precise and reversible.

## Inputs

- Target project slug and variant.
- Change request anchored by scene, beat, timestamp, or visible element.
- Current spec and relevant source files for the affected area.

## Outputs

- Minimal spec/code edits that satisfy the request.
- A short revision summary stating what changed and what remained stable.

## Failure Modes

- Ambiguous change request with no stable anchor.
- Requested change conflicts with approved creative direction and needs explicit confirmation.
- Missing target files for the requested scene/beat.

## Rules

- Locate the requested change by scene, beat, timestamp, or visible element.
- If the change alters creative direction, update the spec first.
- If the change only implements approved direction, update the animation project.
- Keep revisions narrow.
- After a change, summarize what moved, what stayed the same, and how to preview it.

## Good Revision Requests

- Slow the transition in beat-3.
- Make the text in Scene 2 easier to read.
- Hold the final diagram for one more second.
- Make the motion feel calmer during the key explanation beat.
