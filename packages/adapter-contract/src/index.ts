/**
 * @studio/adapter-contract
 *
 * Plan 2: runtime RenderAdapter interface + supporting types added.
 */

import type { AdapterName, BeatTimeline } from "@studio/spec-types";

// Re-export AdapterName from spec-types so downstream code can import it from here.
export type { AdapterName } from "@studio/spec-types";

/** Absolute or workspace-relative path to a project folder, e.g. "projects/my-project" */
export type ProjectPath = string & { readonly __brand: "ProjectPath" };

export interface PreviewServer {
  /** Local URL where the preview is served, e.g. "http://localhost:9000" */
  url: string;
  /** Stop the preview server */
  stop(): Promise<void>;
}

export interface RenderOptions {
  variant: string;
  outputPath: string;
  /** Arbitrary props passed to the composition/scene */
  props?: Record<string, unknown>;
}

export interface RenderResult {
  outputPath: string;
  durationMs: number;
}

/**
 * Frame number keyed by sync point id.
 * Maps semantic names from BeatTimeline.syncPoints → frame numbers.
 */
export type SyncPointMap = Record<string, number>;

/**
 * Runtime interface that every adapter package must implement.
 * Agents continue using CLI commands from the registry; this interface
 * enables typed adapter implementations and tooling.
 */
export interface RenderAdapter {
  name: AdapterName;
  capabilities: {
    dimensions: "2d" | "3d" | "both";
    audio: boolean;
    vector: boolean;
  };
  preview(project: ProjectPath): Promise<PreviewServer>;
  render(project: ProjectPath, opts: RenderOptions): Promise<RenderResult>;
  /** Map semantic sync-point names to frame numbers for this adapter. */
  resolveSyncPoints(timeline: BeatTimeline): SyncPointMap;
}

/**
 * Metadata describing a rendering adapter registered in adapter-registry.md.
 * Used by tooling and documentation generators; not a runtime interface.
 */
export interface RenderAdapterMetadata {
  adapter: import("@studio/spec-types").AdapterName;
  /** Package identifier or "direct per-project deps" */
  package: string;
  /** License identifier, e.g. "Remotion license", "MIT" */
  license: string;
  /** Comma-separated capability tags, e.g. ["2d", "audio", "vector"] */
  capabilities: string[];
  /** Path to the skills directory relative to agent-context/, e.g. "skills/adapters/remotion/" */
  skillsDir: string;
  /** Command template for starting a preview — substitute <name> */
  previewCmd: string;
  /** Command template for rendering — substitute <name> and <variant> */
  renderCmd: string;
  status: "stable" | "experimental" | "legacy";
}
