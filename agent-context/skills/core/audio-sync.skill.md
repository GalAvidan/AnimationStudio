# Skill: Audio Sync

## Purpose

Align visual events to narration, music, or declared sync points.

## Rules

- Treat audio and narration sync points as the source of truth.
- Name sync points clearly, such as `problem-named`, `idea-clicks`, `product-visible`, or `final-line`.
- During build, convert sync points into frames based on the composition frame rate.
- If a motion cannot align without feeling distorted, ask before changing the timing.
- Do not shift audio to match animation unless the user explicitly asks.

## Tolerance

Aim for visual events to land within two frames of declared sync points.
