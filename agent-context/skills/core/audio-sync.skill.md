# Skill: Audio Sync

## Purpose

Align visual events to narration, music, or declared sync points.

## Inputs

- Beat map or timeline with sync points.
- Composition frame rate.
- Requested visual events that must align.

## Outputs

- Sync mapping from semantic points to frame positions.
- Alignment guidance and tolerance notes for implementation.

## Failure Modes

- Sync point id referenced by animation but missing from the spec/timeline.
- Frame rate unknown when converting time to frames.
- Conflicting timing constraints that require user confirmation.

## Rules

- Treat audio and narration sync points as the source of truth.
- Name sync points clearly, such as `problem-named`, `idea-clicks`, `product-visible`, or `final-line`.
- During build, convert sync points into frames based on the composition frame rate.
- If a motion cannot align without feeling distorted, ask before changing the timing.
- Do not shift audio to match animation unless the user explicitly asks.

## Tolerance

Aim for visual events to land within two frames of declared sync points.
