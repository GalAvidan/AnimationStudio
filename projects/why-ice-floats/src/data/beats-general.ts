import type { BeatTimeline } from "@studio/spec-types";

export const COLORS = {
  bg: "#0a1628",
  ice: "#a8d8ea",
  iceStroke: "#6ab4cc",
  water: "#1a6b9a",
  waterDeep: "#0d4f73",
  molecule: "#c8e8ff",
  molBond: "#5aa0cc",
  glass: "#d0e8f0",
  rock: "#6b5a4e",
  coin: "#d4a843",
  text: "#ffffff",
  label: "#a8d8ea",
} as const;

/**
 * Seconds-from-beat-start at which each sync point fires.
 * molecules scene: lattice-form fires 3s in.
 * density  scene: density-reveal fires 2s in.
 */
export const SYNC = {
  latticeForm: 3,
  densityReveal: 2,
} as const;

/** 7-molecule hexagonal lattice: center + 6 outer at r=88, step 60°. */
export const LATTICE_POS: [number, number][] = [
  [0, 0],
  [88, 0],
  [44, 76],
  [-44, 76],
  [-88, 0],
  [-44, -76],
  [44, -76],
];

/** Scattered liquid positions for the same 7 molecules. */
export const LIQUID_POS: [number, number][] = [
  [-12, -8],
  [120, -80],
  [-100, 90],
  [140, 50],
  [0, -140],
  [-130, -60],
  [80, 130],
];

export const TIMELINE: BeatTimeline = {
  projectSlug: "why-ice-floats",
  variantId: "general",
  fps: 30,
  scenes: [
    {
      id: "hook",
      label: "Hook",
      beats: [
        {
          id: "hook",
          label: "Ice floats",
          start: 0,
          end: 5,
          narration: "Take a glass of water. Drop in an ice cube. It floats.",
        },
      ],
    },
    {
      id: "solids-sink",
      label: "Contrast",
      beats: [
        {
          id: "contrast",
          label: "Solids sink",
          start: 5,
          end: 10,
          narration: "A rock. A coin. They sink.",
          speaker: "curious",
          emotion: "curious",
        },
      ],
    },
    {
      id: "ice-rises",
      label: "The strange thing",
      beats: [
        {
          id: "strange",
          label: "Ice rises",
          start: 10,
          end: 15,
          narration: "So why does solid water float on liquid water?",
          speaker: "curious",
          emotion: "surprised",
        },
      ],
    },
    {
      id: "molecules",
      label: "Hex lattice",
      beats: [
        {
          id: "lattice",
          label: "Molecules lock into cage",
          start: 15,
          end: 22,
          narration:
            "When water freezes, its molecules lock into a hexagonal cage — spreading them farther apart.",
        },
      ],
    },
    {
      id: "density",
      label: "Density payoff",
      beats: [
        {
          id: "density",
          label: "Same mass, more space",
          start: 22,
          end: 27,
          narration: "Same molecules. More space. Less dense. It floats.",
        },
      ],
    },
    {
      id: "payoff",
      label: "Payoff",
      beats: [
        {
          id: "payoff",
          label: "Lakes and life",
          start: 27,
          end: 30,
          narration:
            "That's why lakes freeze from the top down — keeping everything underneath alive.",
          speaker: "curious",
          emotion: "happy",
        },
      ],
    },
  ],
  syncPoints: [
    {
      id: "lattice-form",
      time: 18,
      description: "Molecules snap into hexagonal lattice",
    },
    {
      id: "density-reveal",
      time: 24,
      description: "Ice block expands and rises to float",
    },
  ],
};
