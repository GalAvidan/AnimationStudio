export type AdapterName = "remotion" | "motion-canvas";

export interface VideoConfig {
  width: number;
  height: number;
  fps: number;
}

export interface ProjectVariant {
  /** kebab-case, unique within project */
  id: string;
  /** free-form label, e.g. "general", "dev" */
  audience: string;
  /** path relative to project root */
  script: string;
  /** path relative to project root */
  spec: string;
  /** path relative to project root */
  output: string;
  /** adapter-specific composition/scene id */
  compositionId: string;
  /** optional override; otherwise derived from spec beats */
  durationFrames?: number;
}

/**
 * A character referenced by a project. Beats may attribute lines to a character
 * via `Beat.speaker` (which should match `CharacterRef.id`).
 *
 * Adapter-agnostic — the rig file format and how the asset is loaded is the
 * concern of the adapter (e.g. `@studio/adapter-motion-canvas` ships a `Rig`
 * helper that consumes a parts map; see its `character-rig.skill.md`).
 */
export interface CharacterRef {
  /** kebab-case, unique within project */
  id: string;
  /** display label, e.g. "Hero", "Friend" */
  label: string;
  /** optional path relative to project root, e.g. "assets/hero.svg" */
  rigAsset?: string;
}

export interface ProjectConfig {
  /** kebab-case, must match folder name under projects/ */
  slug: string;
  title: string;
  adapter: AdapterName;
  /** must match a variants[].id */
  defaultVariant: string;
  /** length >= 1 */
  variants: ProjectVariant[];
  video: VideoConfig;
  /** optional cast for narrative / character-driven projects */
  characters?: CharacterRef[];
  /** optional, for cataloging */
  tags?: string[];
}

// ---- Beat / Scene / Sync types ----

export interface Beat {
  id: string;
  label: string;
  /** start time in seconds */
  start: number;
  /** end time in seconds */
  end: number;
  narration?: string;
  visual?: string;
  /**
   * Character id delivering the narration line. Must match a
   * `ProjectConfig.characters[].id` when present. Omit for narrator.
   */
  speaker?: string;
  /**
   * Free-form emotion tag (e.g. "curious", "worried"). Currently authoring
   * intent only — no runtime behavior. Adapters with a rig + presets system
   * may auto-resolve this to a preset name in a future plan.
   */
  emotion?: string;
}

export interface Scene {
  id: string;
  label: string;
  beats: Beat[];
}

export interface SyncPoint {
  id: string;
  /** time in seconds */
  time: number;
  description?: string;
}

export interface BeatTimeline {
  projectSlug: string;
  variantId: string;
  fps: number;
  scenes: Scene[];
  syncPoints: SyncPoint[];
}
