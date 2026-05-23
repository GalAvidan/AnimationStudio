import type { BeatTimeline } from "@studio/spec-types";
import { palette, fonts } from "@studio/theme-mathematical-theorems";

// ---- Palette (from specs/kids.spec.md) ----
export const COLORS = {
  bg:       palette.background,
  ink:      palette.ink,
  legA:     "#E85D4A", // red, short leg (length 3)
  legB:     "#4A90D9", // blue, long leg (length 4)
  hyp:      "#7ED321", // green, hypotenuse (length 5)
  sparkle:  palette.accent,
  marker:   palette.ink,
} as const;

export const FONT = fonts.body;

// ---- Geometry (px) ----
export const UNIT = 80;
export const LEG_A = 3 * UNIT; // 240 — vertical leg
export const LEG_B = 4 * UNIT; // 320 — horizontal leg
export const HYP   = 5 * UNIT; // 400

// Triangle vertices in scene coords (MC default: +x right, +y down)
// Right-angle corner P1 at bottom-left; leg B goes right to P2; leg A goes up to P3.
export const P1: [number, number] = [-300, 200];
export const P2: [number, number] = [P1[0] + LEG_B, P1[1]];          // (-300+320, 200) = (20, 200)
export const P3: [number, number] = [P1[0], P1[1] - LEG_A];          // (-300, 200-240) = (-300, -40)

// Midpoints of each side
export const MID_A: [number, number] = [P1[0], (P1[1] + P3[1]) / 2]; // (-300, 80)
export const MID_B: [number, number] = [(P1[0] + P2[0]) / 2, P1[1]]; // (-140, 200)
export const MID_C: [number, number] = [(P3[0] + P2[0]) / 2, (P3[1] + P2[1]) / 2]; // (-140, 80)

// World-space centers of each square (after unfolding outward from its side)
export const SQA_CENTER: [number, number] = [MID_A[0] - LEG_A / 2, MID_A[1]];                 // (-420, 80)
export const SQB_CENTER: [number, number] = [MID_B[0], MID_B[1] + LEG_B / 2];                 // (-140, 360)
// For hypotenuse: outward unit vector = (+0.6, -0.8); offset by HYP/2 along outward
export const SQC_CENTER: [number, number] = [MID_C[0] + 0.6 * HYP / 2, MID_C[1] - 0.8 * HYP / 2]; // (-20, -80)

// Container rotations (degrees, MC convention) so local -y points outward
export const ROT_A = -90;                     // leg A: outward = (-1, 0)
export const ROT_B = 180;                     // leg B: outward = (0, +1)
export const ROT_C = 36.8699;                 // hypotenuse: outward = (+0.6, -0.8)

// Equation slot positions (top-right area; non-rotated)
export const EQ_Y      = -270;
export const EQ_X_A    = 360;
export const EQ_X_PLUS = 470;
export const EQ_X_B    = 580;
export const EQ_X_EQ   = 700;
export const EQ_X_Q    = 800; // "?" or "25"
export const EQ_DOCK_Y = -180; // where the docked numbers (9, 16) sit under their letters

// Title position (large hero text)
export const TITLE_POS: [number, number] = [380, 220];

// Caption label positions — contextual labels per beat
export const CAPTION_90_POS:    [number, number] = [-240, 230]; // right of right-angle corner
export const CAPTION_SQA_POS:   [number, number] = [-420, -90]; // above red square
export const CAPTION_SQB_POS:   [number, number] = [ 220, 370]; // right of blue square
export const CAPTION_SQC_POS:   [number, number] = [ 420, -90]; // right of green square
export const CAPTION_FINAL_POS: [number, number] = [ 380, 230]; // theorem takeaway area

// ---- Beat durations (seconds) ----
export const BEATS = {
  intro:    6,
  labels:   7,
  squareA:  9,
  squareB:  9,
  equation: 8,
  sum:     12,
  verify:   9,
} as const;

// Total = 60s

// ---- Beat timeline (absolute times) ----
export const TIMELINE: BeatTimeline = {
  projectSlug: "pythagorean-theorem",
  variantId:   "kids",
  fps:         30,
  scenes: [
    {
      id: "main",
      label: "Pythagorean Theorem — Kids",
      beats: [
        { id: "intro",    label: "Triangle appears",         start:  0, end:  6, narration: "Meet a triangle with a square corner.",                          visual: "Triangle slides in, right-angle marker pops." },
        { id: "labels",   label: "Label sides 3, 4, 5",      start:  6, end: 13, narration: "Short sides 3 and 4. Long side 5.",                              visual: "Numbers fly onto each side." },
        { id: "square-a", label: "Red square A² = 9",        start: 13, end: 22, narration: "Build a square on the side of length 3. Nine little squares.",  visual: "Red 3×3 square unfolds; dots count to 9." },
        { id: "square-b", label: "Blue square B² = 16",      start: 22, end: 31, narration: "Same on the side of length 4. Sixteen.",                         visual: "Blue 4×4 square unfolds; dots count to 16." },
        { id: "equation", label: "Equation appears",         start: 31, end: 39, narration: "Nine over here, sixteen there. Add them up.",                    visual: "A² + B² = ? types in; 9 and 16 dock under." },
        { id: "sum",      label: "9+16 → 25 on hypotenuse",  start: 39, end: 51, narration: "Twenty-five. The square on the longest side.",                   visual: "9 and 16 collide into 25; green square unfolds; 25 lands on it." },
        { id: "verify",   label: "A² + B² = C² ✓",           start: 51, end: 60, narration: "A squared plus B squared equals C squared.",                     visual: "Equation completes with ✓. Hero title settles." },
      ],
    },
  ],
  syncPoints: [
    { id: "triangle-in",       time:  0.5, description: "Triangle settle bounce" },
    { id: "legs-labeled",      time:  7.0, description: "First number sticks" },
    { id: "square-a-pop",      time: 14.0, description: "Red square unfolds" },
    { id: "square-b-pop",      time: 23.0, description: "Blue square unfolds" },
    { id: "equation-appear",   time: 31.5, description: "Equation types in" },
    { id: "sum-collide",       time: 42.0, description: "9 and 16 collide into 25" },
    { id: "hypotenuse-square", time: 45.0, description: "Green square unfolds off hypotenuse" },
    { id: "verify-equals",     time: 54.0, description: "Checkmark + hero title settle" },
  ],
};
