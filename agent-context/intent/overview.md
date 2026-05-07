# AnimationStudio Overview

AnimationStudio is a workflow-first repository for turning explanations into short, clear animations. The value is in the repeatable creative process, not in a custom design UI.

## Purpose

Help Gal move from an idea or rough explanation to a reviewed animation spec, then to a Remotion project that can be previewed, revised, and rendered.

## Core Workflow

Script -> Spec -> Build -> Preview -> Render -> Revise

## Principles

- The script says what needs to be explained.
- The spec is the contract between explanation and visuals.
- The Remotion project is generated from the reviewed spec.
- The output is a video or still derived from the project.
- Revisions should refer to beats, timestamps, visual intent, or scene names.

## Default Render Stack

Use Remotion for v1. Remotion turns React components into video, which makes animations inspectable, editable, and reproducible in VS Code.

## Agent Behavior

- Load only the context needed for the current request.
- Ask when creative intent is missing.
- Keep human-authored artifacts readable.
- Do not skip the spec step for non-trivial animations.
- Do not bury important creative decisions in code.
