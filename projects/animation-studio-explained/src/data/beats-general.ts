// ─── General variant: ~80s @ 30fps ────────────────────────────────────────────
//
// All durations are in frames. Sequences abut directly (no overlap) for
// simplicity; each scene handles its own internal fade-in and fade-out.

export const FPS = 30;

const s = (sec: number) => Math.round(sec * FPS);

export type BeatKey =
  | "hook"
  | "pipelineOverview"
  | "scriptStage"
  | "specStage"
  | "beatAndScene"
  | "buildStage"
  | "previewStage"
  | "renderStage"
  | "reviseLoop"
  | "closing";

export const SEQUENCES: Record<BeatKey, { from: number; duration: number }> = (() => {
  const order: Array<{ key: BeatKey; sec: number }> = [
    { key: "hook",             sec: 8 },
    { key: "pipelineOverview", sec: 10 },
    { key: "scriptStage",      sec: 12 },
    { key: "specStage",        sec: 15 },
    { key: "beatAndScene",     sec: 15 },
    { key: "buildStage",       sec: 13 },
    { key: "previewStage",     sec: 9 },
    { key: "renderStage",      sec: 8 },
    { key: "reviseLoop",       sec: 12 },
    { key: "closing",          sec: 8 },
  ];
  let cursor = 0;
  const out = {} as Record<BeatKey, { from: number; duration: number }>;
  for (const { key, sec } of order) {
    out[key] = { from: cursor, duration: s(sec) };
    cursor += s(sec);
  }
  return out;
})();

const lastSeq = SEQUENCES.closing;
export const TOTAL_FRAMES = lastSeq.from + lastSeq.duration;

// Which pipeline stage each beat belongs to (for tile glow).
// `null` = no pipeline stage active (hook, drill-down, closing).
export const ACTIVE_STAGE_PER_BEAT: Record<BeatKey, null | "script" | "spec" | "build" | "preview" | "render" | "revise"> = {
  hook:             null,
  pipelineOverview: null,
  scriptStage:      "script",
  specStage:        "spec",
  beatAndScene:     "spec", // drill-down still belongs to spec stage
  buildStage:       "build",
  previewStage:     "preview",
  renderStage:      "render",
  reviseLoop:       "revise",
  closing:          null,
};

// Variant flag — used by shared scenes that show extra detail in dev.
export const VARIANT = "general" as const;
