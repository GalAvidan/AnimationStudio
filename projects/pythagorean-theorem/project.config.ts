import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "pythagorean-theorem",
  title: "Pythagorean Theorem",
  adapter: "motion-canvas",
  defaultVariant: "kids",
  variants: [
    {
      id: "kids",
      audience: "kids",
      script: "scripts/kids.script.md",
      spec: "specs/kids.spec.md",
      output: "output/kids.mp4",
      compositionId: "PythagoreanTheoremKids",
    },
    {
      id: "adults",
      audience: "adults",
      script: "scripts/adults.script.md",
      spec: "specs/adults.spec.md",
      output: "output/adults.mp4",
      compositionId: "PythagoreanTheoremAdults",
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
  tags: ["math", "geometry", "playful"],
};

export default config;
