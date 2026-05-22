import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "agentic-ai-architecture",
  title: "Agentic AI Architecture",
  adapter: "motion-canvas",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "AgenticAiArchitectureGeneral",
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
  tags: ["architecture", "educational", "speech-test"],
};

export default config;
