import type { Pose } from "@studio/adapter-motion-canvas/rig";

/**
 * Hero presets. Names match the `emotion` vocabulary used in
 * `specs/general.spec.md`, so scene code can do
 *   `yield* hero.applyPreset(beat.emotion ?? "neutral")`.
 *
 * Values are *offsets from baseline*, not absolute positions.
 */
export const heroPresets: Record<string, Pose> = {
  neutral: {
    mouth_neutral: { swap: "mouth_neutral" },
    brow_left:  { rotation: 0 },
    brow_right: { rotation: 0 },
    eye_left:   { scale: 1 },
    eye_right:  { scale: 1 },
  },
  happy: {
    mouth_neutral: { swap: "mouth_smile" },
    brow_left:  { rotation: -6 },
    brow_right: { rotation: 6 },
  },
  worried: {
    mouth_neutral: { swap: "mouth_frown" },
    brow_left:  { rotation: 18 },
    brow_right: { rotation: -18 },
    eye_left:   { scale: 0.95 },
    eye_right:  { scale: 0.95 },
  },
};
