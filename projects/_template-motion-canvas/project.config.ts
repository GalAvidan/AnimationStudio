import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "project-name", // replace with kebab-case project name; must match folder name
  title: "Project Title",
  adapter: "motion-canvas",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "ProjectNameGeneral", // replace with stable PascalCase + variant
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
};

export default config;
