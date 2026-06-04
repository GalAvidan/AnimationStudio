# Glossary

## Script

The spoken or written explanation. It can be rough notes, a transcript, or polished narration.

## Spec

The creative direction contract between script and visuals. It describes the animation in beats and intent without prescribing code.

## Beat

A meaningful moment in the explanation where the viewer should understand, feel, or notice something specific. Beats are the primary unit of spec authoring and audio alignment.

## Scene

A visual section of the animation. A scene may contain multiple beats.

## Sync Point

A moment where motion should align with narration, music, or an important visual event. Sync points are declared in the spec and consumed by the compile-timeline task.

## Adapter

The rendering engine used to build and export an animation (e.g., `motion-canvas`, `remotion`). The active adapter is declared in `project.config.ts` and resolved via `agent-context/map/adapter-registry.md`. All task and skill loading is adapter-driven.

## Variant

A named version of an animation produced from the same project (e.g., `general`, `dev`, `short`). Each variant has its own script, spec, and props file. Variants share source code but may differ in timing, narration, and visible content.

## Collection

A themed grouping of related animation projects sharing a design-token package (`@studio/theme-<collection>`). A collection folder (`projects/<collection>/`) contains a `_theme/` package and one or more standard project folders. Declared in `project.config.ts` via the `collection` field.

## Audio Plan

The high-level audio intent document for a project, stored at `{projects}/<name>/audio/plan.json`. Specifies voice profiles, music moods, and SFX intent. Created by the `create-audio-plan` task; required before any TTS or music selection runs.

## Build

The process of turning a reviewed spec into an animation project using the active adapter (e.g., Motion Canvas or Remotion).

## Render

The process of exporting an animation composition to a video or still image using the active adapter.

## Campaign

A cross-studio grouping of related animation projects that share characters, voices, style tokens, and handoff assets. Declared in `project.config.ts` via `campaign.slug`. Campaign content lives in `Vault/campaigns/{campaign-slug}/`. See `agent-context/intent/dependencies/campaign.md`.

## Sub-Project

An individual animation project that belongs to a campaign. Identified by `campaign.subProjectId` in `project.config.ts`. A sub-project consumes shared campaign assets but is self-contained under `{projects}/<name>/`.

## Compiled Timeline

The merged audio and animation schedule produced by the `compile-timeline` task. Stored at `{projects}/<name>/audio/compiled.timeline.json`. Required before a composition can mount narration clips, music beds, or SFX cues.
