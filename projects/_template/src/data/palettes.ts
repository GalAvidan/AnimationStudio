import type { PaletteSet } from "@studio/spec-types";

export const animationPalettes: PaletteSet[] = [
  {
    id: "clean-light",
    label: "Clean Light",
    description: "Neutral UI-focused palette for explainer content.",
    tokens: {
      background: "#f5f7fb",
      surface: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      accent: "#0f766e",
      accentText: "#ecfeff",
    },
  },
  {
    id: "cinematic-night",
    label: "Cinematic Night",
    description: "High contrast palette for dramatic storytelling.",
    tokens: {
      background: "#0b1022",
      surface: "#131a34",
      textPrimary: "#f8fafc",
      textSecondary: "#cbd5e1",
      accent: "#f97316",
      accentText: "#fff7ed",
    },
  },
  {
    id: "spring-energy",
    label: "Spring Energy",
    description: "Friendly vibrant palette for playful scenes.",
    tokens: {
      background: "#f0fdf4",
      surface: "#dcfce7",
      textPrimary: "#14532d",
      textSecondary: "#166534",
      accent: "#a21caf",
      accentText: "#fdf4ff",
    },
  },
];

export const defaultPaletteId = "clean-light";
