// ─── Frame Rate & Total Length ────────────────────────────────────────────────

export const FPS_DEV = 30;
export const TOTAL_FRAMES_DEV = 1650; // 55 seconds

// ─── Sequence Ranges ──────────────────────────────────────────────────────────
// Sequences overlap slightly at boundaries so scenes can fade in/out smoothly.

export const SEQUENCES_DEV = {
  hook:           { from: 0,    duration: 150 }, // 0:00 – 0:05
  contextAssembly:{ from: 110,  duration: 370 }, // 0:03.7 – 0:16
  transformerPass:{ from: 450,  duration: 380 }, // 0:15 – 0:27.7
  reactLoop:      { from: 800,  duration: 440 }, // 0:26.7 – 0:41.3
  tools:          { from: 1200, duration: 280 }, // 0:40 – 0:49.3
  generation:     { from: 1450, duration: 200 }, // 0:48.3 – 0:55
} as const;

// ─── Sync Points (global frames) ─────────────────────────────────────────────

export const SYNC_DEV = {
  openingSettled:      80,  // 0:02.7
  contextStarts:      150,  // 0:05
  attentionGridIn:    470,  // 0:15.7
  lowerTriLights:     540,  // 0:18
  reactThink:         830,  // 0:27.7
  reactCall:          930,  // 0:31
  reactObserve:      1030,  // 0:34.3
  reactGenerates:    1140,  // 0:38
  toolSchemaIn:      1240,  // 0:41.3
  toolJsonOut:       1320,  // 0:44
  toolResultInjected:1400,  // 0:46.7
  formulaAppears:    1490,  // 0:49.7
  tokensStart:       1540,  // 0:51.3
  finalCaption:      1580,  // 0:52.7
} as const;

// ─── Local Sync Points ────────────────────────────────────────────────────────
// global frame minus the sequence's from value.

export const LOCAL_SYNC_DEV = {
  hook: {
    fadeIn:  0,
    settled: SYNC_DEV.openingSettled - SEQUENCES_DEV.hook.from,  // 80
    fadeOut: SEQUENCES_DEV.hook.duration - 20,                   // 130
  },
  contextAssembly: {
    fadeIn:  0,
    starts:  SYNC_DEV.contextStarts - SEQUENCES_DEV.contextAssembly.from, // 40
    fadeOut: SEQUENCES_DEV.contextAssembly.duration - 20,                 // 350
  },
  transformerPass: {
    fadeIn:  0,
    gridIn:  SYNC_DEV.attentionGridIn - SEQUENCES_DEV.transformerPass.from, // 20
    lights:  SYNC_DEV.lowerTriLights  - SEQUENCES_DEV.transformerPass.from, // 90
    fadeOut: SEQUENCES_DEV.transformerPass.duration - 20,                    // 360
  },
  reactLoop: {
    fadeIn:    0,
    think:     SYNC_DEV.reactThink     - SEQUENCES_DEV.reactLoop.from, // 30
    call:      SYNC_DEV.reactCall      - SEQUENCES_DEV.reactLoop.from, // 130
    observe:   SYNC_DEV.reactObserve   - SEQUENCES_DEV.reactLoop.from, // 230
    generates: SYNC_DEV.reactGenerates - SEQUENCES_DEV.reactLoop.from, // 340
    fadeOut:   SEQUENCES_DEV.reactLoop.duration - 20,                   // 420
  },
  tools: {
    fadeIn:   0,
    schemaIn: SYNC_DEV.toolSchemaIn       - SEQUENCES_DEV.tools.from, // 40
    jsonOut:  SYNC_DEV.toolJsonOut         - SEQUENCES_DEV.tools.from, // 120
    injected: SYNC_DEV.toolResultInjected  - SEQUENCES_DEV.tools.from, // 200
    fadeOut:  SEQUENCES_DEV.tools.duration - 20,                        // 260
  },
  generation: {
    fadeIn:   0,
    formula:  SYNC_DEV.formulaAppears - SEQUENCES_DEV.generation.from, // 40
    tokens:   SYNC_DEV.tokensStart    - SEQUENCES_DEV.generation.from, // 90
    caption:  SYNC_DEV.finalCaption   - SEQUENCES_DEV.generation.from, // 130
    // last scene — no fadeOut
  },
} as const;

// ─── Scene Data ───────────────────────────────────────────────────────────────

/** Context blocks for the developer context-window scene — 6 segments. */
export const CONTEXT_BLOCKS_DEV = [
  { label: "System Prompt",  description: "Rules, persona, and constraints",         color: "#475569", bg: "#F1F5F9" },
  { label: "Tool Schemas",   description: "JSON schemas of callable tools",           color: "#047857", bg: "#D1FAE5" },
  { label: "Memory",         description: "Persisted notes from prior turns",          color: "#B45309", bg: "#FEF3C7" },
  { label: "Skills",         description: "Instruction files injected at turn start",  color: "#6D28D9", bg: "#EDE9FE" },
  { label: "History",        description: "Prior messages in this conversation",        color: "#0369A1", bg: "#E0F2FE" },
  { label: "New Message",    description: "What you just sent",                        color: "#4338CA", bg: "#EEF2FF" },
] as const;

/** Frame offset between each context block sliding in (local frames after `starts`). */
export const CONTEXT_BLOCK_STAGGER_DEV = 50;

/** Size of the causal attention demo grid (MATRIX_SIZE × MATRIX_SIZE). */
export const MATRIX_SIZE_DEV = 6;

/** Output tokens used in the dev generation scene. */
export const OUTPUT_TOKENS_DEV = [
  "The", "model", "predicts", "one", "token", "at", "a", "time.",
] as const;

/** Frame delay between each output token appearing. */
export const TOKEN_GEN_STAGGER_DEV = 10;
