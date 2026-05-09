import { Easing, interpolate } from "remotion";

/** Smooth ease-out — good for entrances. */
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

/** Balanced ease-in-out — good for conceptual transforms. */
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Springy overshoot — good for pills and badges popping in. */
export const easeSpring = Easing.bezier(0.34, 1.56, 0.64, 1);

/**
 * Returns a 0→1 progress value clamped between startFrame and endFrame.
 * Uses easeOut by default.
 */
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

/**
 * Returns an opacity value that fades IN from startFrame over durationFrames.
 */
export function fadeIn(
  frame: number,
  startFrame: number,
  durationFrames = 15,
): number {
  return progress(frame, startFrame, startFrame + durationFrames);
}

/**
 * Returns an opacity value that fades OUT from startFrame over durationFrames.
 * Starts at 1 and goes to 0.
 */
export function fadeOut(
  frame: number,
  startFrame: number,
  durationFrames = 15,
): number {
  return 1 - progress(frame, startFrame, startFrame + durationFrames);
}

/**
 * Combines a fade-in and a fade-out into a single scene opacity value.
 * The scene will be invisible before fadeInStart and after fadeOutStart.
 */
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
