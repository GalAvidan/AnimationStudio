import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "project-name", // replace with kebab-case project name; must match folder name
  title: "Project Title",
  adapter: "remotion",
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
  paletteSource: {
    sourcePath: "src/data/palettes.ts",
    defaultPaletteId: "clean-light",
  },
  // campaign: {
  //   slug: "my-campaign",        // kebab-case; must match a folder in Vault/campaigns/
  //   subProjectId: "animation-ep01", // must match a row in sub-projects.md
  // },
};

export default config;
