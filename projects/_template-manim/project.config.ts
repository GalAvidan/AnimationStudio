import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "project-name", // replace with kebab-case project name; must match folder name
  title: "Project Title",
  adapter: "manim",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "ProjectNameGeneral", // replace — must match the Python class name in src/scenes/general.py
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
};

export default config;
