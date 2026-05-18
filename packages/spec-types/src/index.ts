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
