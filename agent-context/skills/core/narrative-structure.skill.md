# Skill: Narrative Structure

## Purpose

Author specs and scripts for animations that have **named characters delivering lines** and explicit **scene transitions**. Adapter-agnostic.

## When to Use

- The project has 2+ characters who speak.
- The spec needs to track **who** says what, not just the words.
- Scene boundaries are dramatic moments (a fade, a hold) rather than silent cuts.

Pure explainer animations with a single narrator (e.g. `why-sky-is-blue`) do **not** need any of this. All narrative fields are optional and back-compatible.

## The Three Narrative Fields

### `Beat.speaker`

Kebab-case character id, matches `ProjectConfig.characters[].id` and the spec's Cast table.

```ts
{
  id: "exchange-1",
  label: "Hero asks",
  start: 0, end: 3,
  speaker: "hero",
  narration: "Why is everything so quiet?",
}
```

Omit for narrator (default behavior, no change from today).

### `Beat.emotion`

Free-form tag. **Authoring intent only — no runtime behavior.** Captures what the line should feel like so a scene-author (or future tooling) can pick the right rig preset.

```ts
{ ..., speaker: "hero", emotion: "worried", narration: "..." }
```

Recommended starter vocabulary: `neutral`, `happy`, `worried`, `surprised`, `curious`, `sad`, `angry`. Projects extend as needed; the rig's `presets` map defines the actual values.

A scene-author wiring beats to a Motion Canvas rig writes:

```ts
yield* hero.applyPreset(beat.emotion ?? "neutral");
```

A future plan may auto-resolve this; today the author writes it explicitly.

### `ProjectConfig.characters`

The cast list:

```ts
characters: [
  { id: "hero",   label: "Hero",   rigAsset: "assets/hero.svg" },
  { id: "friend", label: "Friend", rigAsset: "assets/friend.svg" },
],
```

Every `Beat.speaker` value should match one of these ids.

## Scene Transitions

Scripts use a prose marker between paragraphs that map to different scenes:

```
[SPEAKER: hero]
Why is everything so quiet?

[TRANSITION: fade 400ms]

[SPEAKER: friend]
Look up — the sky is on fire.
```

**Currently supported:** `fade`. (`cut` is the default when no marker is present; `hold` is reserved for later.)

### How the marker becomes a real transition

There is no typed `SceneTransition` field on `Scene` yet — the agent writing the scene file reads the marker and translates it. For Motion Canvas:

```ts
// src/project.ts
import { makeProject } from "@motion-canvas/core";
import { fadeTransition } from "@motion-canvas/core/lib/transitions";
import sceneA from "./scenes/a";
import sceneB from "./scenes/b";

// Wrap scene B's start with the fade transition.
const sceneBWithFade = makeScene2D(function* (view) {
  yield* fadeTransition(0.4);   // 400ms
  yield* sceneB(view);
});

export default makeProject({ scenes: [sceneA, sceneBWithFade] });
```

A generic spec-driven runner is not in this plan — it lands when ≥2 transition kinds or ≥2 projects need it.

## Authoring Checklist

- [ ] Every `Beat.speaker` matches a `ProjectConfig.characters[].id`.
- [ ] The spec's Cast table mirrors `project.config.ts`.
- [ ] Emotion tags use the same names as the rig's `presets` map (so `hero.applyPreset(beat.emotion)` works without surprises).
- [ ] Scene-boundary transitions are declared in the script with `[TRANSITION: ...]`, not silently implied.

## Non-Goals (this plan)

- No automatic emotion → preset resolution at render time.
- No typed `SceneTransition` schema.
- No dialogue camera framing, branching narrative, or non-linear beat order.
