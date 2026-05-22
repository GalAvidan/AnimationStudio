import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "why-ice-floats",
  title: "Why Does Ice Float?",
  adapter: "motion-canvas",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "WhyIceFloatsGeneral",
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
  characters: [
    { id: "curious", label: "Curious", rigAsset: "assets/curious.svg" },
  ],
};

export default config;
