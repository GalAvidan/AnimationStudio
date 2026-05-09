// Stage palette — keep in lockstep with the spec's "Visual Philosophy".

export type StageId =
  | "script"
  | "spec"
  | "build"
  | "preview"
  | "render"
  | "revise";

export type StageDef = {
  id: StageId;
  label: string;
  icon: string; // single emoji-ish glyph; rendered as text, not an asset
  fill: string;
  accent: string;
};

export const STAGES: ReadonlyArray<StageDef> = [
  { id: "script",  label: "Script",  icon: "✎", fill: "#FAF6EC", accent: "#A07A28" },
  { id: "spec",    label: "Spec",    icon: "▦", fill: "#EAF1FA", accent: "#2C5BA1" },
  { id: "build",   label: "Build",   icon: "</>", fill: "#EAF8EE", accent: "#1F8A4C" },
  { id: "preview", label: "Preview", icon: "▶", fill: "#F1ECF9", accent: "#6B40C4" },
  { id: "render",  label: "Render",  icon: "◉", fill: "#FDF1E0", accent: "#C77A1F" },
  { id: "revise",  label: "Revise",  icon: "↻", fill: "#E6F6F7", accent: "#1F7A85" },
] as const;

export const TEXT_PRIMARY = "#111111";
export const TEXT_MUTED = "#6B7280";
export const BACKGROUND = "#FFFFFF";
export const TERMINAL_BG = "#1A1A1A";
export const TERMINAL_TEXT = "#E5E7EB";

export const FONT_SANS =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
export const FONT_MONO =
  "'JetBrains Mono', 'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
