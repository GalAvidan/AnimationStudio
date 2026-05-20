# Spec: Character Pilot — general

## Project

- Slug: `character-pilot`
- Variant: `general`
- Runtime: ~15s
- Resolution: 1920×1080 @ 30fps
- Adapter: motion-canvas

## Visual Philosophy

Two stylized characters, head-and-shoulders, on a calm dark background.
Motion is deliberately restrained: subtle preset swaps, slow look-ats, soft
blinks. The pilot exists to prove the rig API expresses *who* is speaking and
*how they feel* without leaning on text or audio.

---

## Cast

| Character id | Label   | Notes                                  |
|--------------|---------|----------------------------------------|
| `hero`       | Hero    | Warm-skinned circle head, dark accents |
| `friend`     | Friend  | Mint-green circle head, dark accents   |

---

## Beat Map

| Beat | Duration | Speaker  | Emotion  | Narration                                 | What the viewer sees                                         | Purpose                          |
|------|---------:|----------|----------|-------------------------------------------|--------------------------------------------------------------|----------------------------------|
| 1    | 2s       |          |          |                                           | Hero alone, idle blink, neutral expression                   | Establish hero, set quiet mood   |
| 2    | 2.5s     | hero     | worried  | "Why is everything so quiet?"             | Hero turns worried, looks right (toward where friend will be) | Pose the question                |
| 3    | 2.5s     |          |          |                                           | Friend fades in on the right, looks back at hero              | Introduce friend                 |
| 4    | 3s       | friend   | happy    | "It's okay — I'm right here."             | (after fade transition) Friend smiles, leans toward hero      | Reassurance                      |
| 5    | 3s       | hero     | happy    | "Oh. Then it's not so quiet after all."   | Hero relaxes, smiles, looks back at friend                    | Resolution                       |
| 6    | 2s       |          |          |                                           | Both blink in unison, settle                                  | Closing breath                   |

## Narration Sync Points

| Id              | Time  | Note                                                                  |
|-----------------|------:|-----------------------------------------------------------------------|
| `hero-question` | 2.0s  | Hero's `worried` preset lands on the word "quiet"                     |

## Assets

- `assets/hero.presets.ts`   — neutral, happy, worried
- `assets/friend.presets.ts` — neutral, happy, worried

(Characters are built from primitives in `src/characters/`; SVG assets are
deferred — the pilot exists to validate the rig API, not the loader path.)

## Constraints

- No audio yet.
- No camera moves.
- Single fade transition between scene 1 and scene 2.
- All emotion vocabulary must exist as a preset on every character it's
  applied to.

## Review Checklist

- [ ] Every `Speaker` value matches a Cast id.
- [ ] Every `Emotion` value exists as a preset on that speaker's rig.
- [ ] `[SYNC: hero-question]` lands on "quiet".
- [ ] `[TRANSITION: fade 400ms]` is translated to `fadeTransition(0.4)` at the start of scene 2.
- [ ] Total runtime is within ±1s of 15s.
