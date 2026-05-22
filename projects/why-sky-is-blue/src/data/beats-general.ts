import type { BeatTimeline } from "@studio/spec-types";

// ---- Color palette (from spec) ----

export const COLORS = {
  bg:          "#0a0e1a",
  skyBlue:     "#4a90d9",
  atmosphere:  "#b8d4f0",
  molecule:    "#c8ddf0",
  red:         "#e85d4a",
  orange:      "#f5a623",
  yellow:      "#f8e71c",
  green:       "#7ed321",
  blue:        "#4a90d9",
  violet:      "#9b59b6",
  sunset:      "#ff6b35",
  white:       "#ffffff",
} as const;

// ---- Spectrum (ROYGBV order) ----

export const SPECTRUM = [
  { color: "#e85d4a", name: "red"    },
  { color: "#f5a623", name: "orange" },
  { color: "#f8e71c", name: "yellow" },
  { color: "#7ed321", name: "green"  },
  { color: "#4a90d9", name: "blue"   },
  { color: "#9b59b6", name: "violet" },
] as const;

// ---- Sync point offsets in seconds (relative to the start of their beat) ----

export const SYNC = {
  spectrumFan:   3, // beat: white-light — white ray fans into spectrum
  scatterBounce: 8, // beat: scattering  — blue burst fires
  longPath:      3, // beat: sunset      — path line extends
} as const;

// ---- Full beat timeline (absolute times, 30 fps) ----

export const TIMELINE: BeatTimeline = {
  projectSlug: "why-sky-is-blue",
  variantId:   "general",
  fps:         30,
  scenes: [
    {
      id: "question",
      label: "The question",
      beats: [{ id: "question", label: "Why is the sky blue?", start: 0, end: 5,
        narration: "Why is the sky blue?",
        visual:    "Sky gradient, sun rises from lower-left, question text fades in then out" }],
    },
    {
      id: "white-light",
      label: "White light",
      beats: [{ id: "white-light", label: "Sunlight is every color", start: 5, end: 13,
        narration: "Sunlight looks white — but it's every color at once.",
        visual:    "White ray fans into full ROYGBV spectrum" }],
    },
    {
      id: "atmosphere",
      label: "The atmosphere",
      beats: [{ id: "atmosphere", label: "Gas molecules everywhere", start: 13, end: 20,
        narration: "Earth's atmosphere is full of tiny gas molecules — mostly nitrogen and oxygen.",
        visual:    "Earth curve, atmosphere band, molecule dots appear" }],
    },
    {
      id: "scattering",
      label: "Rayleigh scattering",
      beats: [{ id: "scattering", label: "Blue bounces, red passes", start: 20, end: 32,
        narration: "When sunlight hits those molecules, shorter wavelengths scatter — in every direction. Blue light bounces. Red light passes straight through.",
        visual:    "Molecule closeup; colored rays approach; red passes, blue bursts outward" }],
    },
    {
      id: "violet",
      label: "Why not violet?",
      beats: [{ id: "violet", label: "Eyes favour blue", start: 32, end: 40,
        narration: "Violet actually scatters even more. So why not a violet sky? Our eyes are simply better tuned for blue.",
        visual:    "Sensitivity curve overlay; blue peak glows, violet dims" }],
    },
    {
      id: "sunset",
      label: "Sunrise / sunset",
      beats: [{ id: "sunset", label: "Longer path depletes blue", start: 40, end: 48,
        narration: "At sunrise or sunset, light takes a longer path through the atmosphere. By the time it reaches you, the blue has already scattered away — leaving orange and red.",
        visual:    "Low-angle sun, long path through atmosphere, blue depletes, warm light arrives" }],
    },
    {
      id: "payoff",
      label: "Payoff",
      beats: [{ id: "payoff", label: "Blue can't stop bouncing", start: 48, end: 55,
        narration: "The sky is blue because blue light can't stop bouncing.",
        visual:    "Wide sky, scattered blue rays converge on silhouetted observer" }],
    },
  ],
  syncPoints: [
    { id: "spectrum-fan",   time: 8,  description: "White ray fans open into full spectrum" },
    { id: "scatter-bounce", time: 28, description: "Blue rays burst outward from molecule" },
    { id: "long-path",      time: 43, description: "Path line extends across the atmosphere" },
  ],
};
