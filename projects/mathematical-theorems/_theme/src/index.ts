/**
 * @studio/theme-mathematical-theorems
 *
 * Shared design tokens for all Mathematical Theorems collection projects.
 * Import these to keep background, ink, accent, and typography consistent
 * across every theorem animation.
 *
 * Project-specific colours (e.g. individual side colours on a triangle) should
 * be defined locally and may reference these tokens as needed.
 */

/** Core colour palette shared across all theorem animations. */
export const palette = {
  /** Warm cream background — gives a "chalkboard notebook" feel. */
  background: "#FFF8E7",
  /** Warm dark brown for text, labels, and geometric markers. */
  ink: "#3A2A1A",
  /** Gold — highlights, sparkle effects, and emphasis moments. */
  accent: "#FFD166",
} as const;

export type Palette = typeof palette;

/** Typography tokens. */
export const fonts = {
  /** Primary display font — friendly and legible for all ages. */
  body: "Nunito, 'Segoe UI', system-ui, sans-serif",
} as const;

export type Fonts = typeof fonts;
