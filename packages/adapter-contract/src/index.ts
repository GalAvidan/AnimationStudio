/**
 * @studio/adapter-contract
 *
 * Plan 1: registry metadata and types only.
 * The full runtime RenderAdapter interface is deferred to Plan 2.
 */

// Re-export AdapterName from spec-types so downstream code can import it from here.
export type { AdapterName } from "@studio/spec-types";

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
