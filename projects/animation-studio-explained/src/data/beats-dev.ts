// ─── Dev variant: ~140s @ 30fps ───────────────────────────────────────────────
//
// All durations are in frames. Sequences abut directly (no overlap);
// each scene handles its own internal fade-in and fade-out.

export const FPS = 30;

const s = (sec: number) => Math.round(sec * FPS);

export type BeatKey =
  | "hook"
  | "pipelineOverview"
  | "scriptStage"
  | "specStage"
  | "terminology"
  | "buildStage"
  | "multiComposition"
  | "previewStage"
  | "renderStage"
  | "reviseLoop"
  | "agentContext"
  | "closing";

export const SEQUENCES: Record<BeatKey, { from: number; duration: number }> = (() => {
  const order: Array<{ key: BeatKey; sec: number }> = [
    { key: "hook",             sec: 8 },
    { key: "pipelineOverview", sec: 12 },
    { key: "scriptStage",      sec: 15 },
    { key: "specStage",        sec: 20 },
    { key: "terminology",      sec: 20 },
    { key: "buildStage",       sec: 20 },
    { key: "multiComposition", sec: 15 },
    { key: "previewStage",     sec: 10 },
    { key: "renderStage",      sec: 10 },
    { key: "reviseLoop",       sec: 15 },
    { key: "agentContext",     sec: 13 },
    { key: "closing",          sec: 12 },
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

export const ACTIVE_STAGE_PER_BEAT: Record<BeatKey, null | "script" | "spec" | "build" | "preview" | "render" | "revise"> = {
  hook:             null,
  pipelineOverview: null,
  scriptStage:      "script",
  specStage:        "spec",
  terminology:      "spec",
  buildStage:       "build",
  multiComposition: "build",
  previewStage:     "preview",
  renderStage:      "render",
  reviseLoop:       "revise",
  agentContext:     null,
  closing:          null,
};

export const VARIANT = "dev" as const;
