import type { ProjectConfig } from "@studio/spec-types";

const config: ProjectConfig = {
  slug: "character-pilot",
  title: "Character Pilot",
  adapter: "motion-canvas",
  defaultVariant: "general",
  variants: [
    {
      id: "general",
      audience: "general",
      script: "scripts/general.script.md",
      spec: "specs/general.spec.md",
      output: "output/general.mp4",
      compositionId: "CharacterPilotGeneral",
    },
  ],
  video: { width: 1920, height: 1080, fps: 30 },
  characters: [
    { id: "hero",   label: "Hero",   rigAsset: "assets/hero.svg" },
    { id: "friend", label: "Friend", rigAsset: "assets/friend.svg" },
  ],
  tags: ["pilot", "narrative", "character-rig"],
};

export default config;
