/**
 * @studio/animation-utils
 * Renderer-neutral animation helpers.
 * No imports from remotion or any adapter — pure TypeScript.
 */

// ---------------------------------------------------------------------------
// Core
// ---------------------------------------------------------------------------

/** Clamp a value to [0, 1]. */
export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

// ---------------------------------------------------------------------------
// Cubic Bezier
// ---------------------------------------------------------------------------

/**
 * Create a cubic-bezier easing function given two control points.
 * Equivalent to CSS cubic-bezier(p1x, p1y, p2x, p2y).
 */
export function bezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): (t: number) => number {
  // Newton-Raphson solver — accurate to ~1e-7 in 8 iterations.
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t: number): number {
    return ((ax * t + bx) * t + cx) * t;
  }
  function sampleCurveY(t: number): number {
    return ((ay * t + by) * t + cy) * t;
  }
  function sampleCurveDerivativeX(t: number): number {
    return (3 * ax * t + 2 * bx) * t + cx;
  }
  function solveCurveX(x: number): number {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const error = sampleCurveX(t) - x;
      if (Math.abs(error) < 1e-7) return t;
      const d = sampleCurveDerivativeX(t);
      if (Math.abs(d) < 1e-15) break;
      t -= error / d;
    }
    return t;
  }

  return (t: number): number => sampleCurveY(solveCurveX(clamp01(t)));
}

// ---------------------------------------------------------------------------
// Easing constants
// ---------------------------------------------------------------------------

/** Quick deceleration — good for entrances. */
export const easeOut = bezier(0.0, 0.0, 0.2, 1.0);

/** Balanced acceleration and deceleration — good for transformations. */
export const easeInOut = bezier(0.42, 0.0, 0.58, 1.0);

/** Slight overshoot spring — good for emphasis. */
export const easeSpring = bezier(0.34, 1.56, 0.64, 1.0);

// ---------------------------------------------------------------------------
// Frame helpers
// ---------------------------------------------------------------------------

/**
 * Map a frame number to a [0, 1] progress value over [start, end].
 * Applies optional easing.
 */
export function progress(
  frame: number,
  start: number,
  end: number,
  easing: (t: number) => number = (t) => t
): number {
  if (end <= start) return 1;
  return easing(clamp01((frame - start) / (end - start)));
}

/**
 * Fade-in from 0→1 starting at `start` over `duration` frames.
 * @param duration defaults to 15 frames
 */
export function fadeIn(frame: number, start: number, duration = 15): number {
  return progress(frame, start, start + duration, easeOut);
}

/**
 * Fade-out from 1→0 starting at `start` over `duration` frames.
 * @param duration defaults to 15 frames
 */
export function fadeOut(frame: number, start: number, duration = 15): number {
  return 1 - progress(frame, start, start + duration, easeOut);
}

/**
 * Combined scene opacity: fade in then fade out.
 * @param fadeDuration defaults to 15 frames for both edges
 */
export function sceneOpacity(
  frame: number,
  fadeInStart: number,
  fadeOutStart: number,
  fadeDuration = 15
): number {
  return Math.min(
    fadeIn(frame, fadeInStart, fadeDuration),
    fadeOut(frame, fadeOutStart, fadeDuration)
  );
}
