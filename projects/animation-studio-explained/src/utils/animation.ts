import { Easing, interpolate } from "remotion";

/** Smooth ease-out — good for entrances. */
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

/** Balanced ease-in-out — good for conceptual transforms. */
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Springy overshoot — good for pills and badges popping in. */
export const easeSpring = Easing.bezier(0.34, 1.56, 0.64, 1);

/** Returns a 0→1 progress value clamped between startFrame and endFrame. */
export function progress(
  frame: number,
  startFrame: number,
  endFrame: number,
  easing: (t: number) => number = easeOut,
): number {
  return interpolate(frame, [startFrame, endFrame], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/** Fade-in opacity from startFrame over durationFrames. */
export function fadeIn(
  frame: number,
  startFrame: number,
  durationFrames = 18,
): number {
  return progress(frame, startFrame, startFrame + durationFrames);
}

/** Fade-out opacity starting at startFrame over durationFrames (1 → 0). */
export function fadeOut(
  frame: number,
  startFrame: number,
  durationFrames = 18,
): number {
  return 1 - progress(frame, startFrame, startFrame + durationFrames);
}

/** Combined scene opacity that fades in at the start and out at the end. */
export function sceneOpacity(
  frame: number,
  fadeInStart: number,
  fadeOutStart: number,
  fadeDuration = 18,
): number {
  return Math.min(
    fadeIn(frame, fadeInStart, fadeDuration),
    fadeOut(frame, fadeOutStart, fadeDuration),
  );
}
