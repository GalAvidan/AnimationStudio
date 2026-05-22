import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "why-sky-is-blue",
  title: "Why the Sky Is Blue",
  adapter: "motion-canvas",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "WhySkyIsBlueGeneral",
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
};

export default config;
