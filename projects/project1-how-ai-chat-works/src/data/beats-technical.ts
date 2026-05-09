// ─── Frame Rate & Total Length ────────────────────────────────────────────────

export const FPS_TECH = 30;
export const TOTAL_FRAMES_TECH = 1800; // 60 seconds

// ─── Sequence Ranges ──────────────────────────────────────────────────────────
// Dense pacing: each beat is 5–7 seconds. Slight overlaps at boundaries.

export const SEQUENCES_TECH = {
  tokenization:   { from: 0,    duration: 210 }, // 0:00 – 0:07
  contextAssembly:{ from: 165,  duration: 210 }, // 0:05.5 – 0:12.5
  causalAttention:{ from: 345,  duration: 210 }, // 0:11.5 – 0:18.5
  reactLoop:      { from: 525,  duration: 255 }, // 0:17.5 – 0:26
  chainOfThought: { from: 750,  duration: 210 }, // 0:25 – 0:32
  toolsMcp:       { from: 930,  duration: 270 }, // 0:31 – 0:40
  skills:         { from: 1170, duration: 210 }, // 0:39 – 0:46
  memoryTiers:    { from: 1350, duration: 210 }, // 0:45 – 0:52
  autoregressive: { from: 1530, duration: 195 }, // 0:51 – 0:57.5
  fullPipeline:   { from: 1680, duration: 120 }, // 0:56 – 1:00
} as const;

// ─── Sync Points (global frames) ─────────────────────────────────────────────

export const SYNC_TECH = {
  tokenSplit:     40,   // 0:01.3
  bpeIds:        105,   // 0:03.5
  contextStarts:  195,  // 0:06.5
  contextAll:    320,   // 0:10.7
  matrixIn:      375,   // 0:12.5
  lowerTriLights:420,   // 0:14
  upperMask:     465,   // 0:15.5
  reactThink:    555,   // 0:18.5
  reactCall:     615,   // 0:20.5
  reactObserve:  675,   // 0:22.5
  reactGenerates:750,   // 0:25
  cotTask:       780,   // 0:26
  cotReasoning:  840,   // 0:28
  cotOutput:     915,   // 0:30.5
  mcpServer:     960,   // 0:32
  mcpArrow:     1050,   // 0:35
  mcpResult:    1110,   // 0:37
  skillFile:    1200,   // 0:40
  skillArrow:   1290,   // 0:43
  memoryTable:  1380,   // 0:46
  memoryRows:   1410,   // 0:47 (staggered from here)
  formula:      1560,   // 0:52
  tokensStart:  1605,   // 0:53.5
  pipelineStart:1710,   // 0:57
  pipelineFinal:1770,   // 0:59
} as const;

// ─── Local Sync Points ────────────────────────────────────────────────────────

export const LOCAL_SYNC_TECH = {
  tokenization: {
    fadeIn:  0,
    split:   SYNC_TECH.tokenSplit - SEQUENCES_TECH.tokenization.from, // 40
    ids:     SYNC_TECH.bpeIds     - SEQUENCES_TECH.tokenization.from, // 105
    fadeOut: SEQUENCES_TECH.tokenization.duration - 20,               // 190
  },
  contextAssembly: {
    fadeIn:  0,
    starts:  SYNC_TECH.contextStarts - SEQUENCES_TECH.contextAssembly.from, // 30
    fadeOut: SEQUENCES_TECH.contextAssembly.duration - 20,                   // 190
  },
  causalAttention: {
    fadeIn:  0,
    gridIn:  SYNC_TECH.matrixIn      - SEQUENCES_TECH.causalAttention.from, // 30
    lights:  SYNC_TECH.lowerTriLights - SEQUENCES_TECH.causalAttention.from, // 75
    mask:    SYNC_TECH.upperMask      - SEQUENCES_TECH.causalAttention.from, // 120
    fadeOut: SEQUENCES_TECH.causalAttention.duration - 20,                   // 190
  },
  reactLoop: {
    fadeIn:    0,
    think:     SYNC_TECH.reactThink     - SEQUENCES_TECH.reactLoop.from, // 30
    call:      SYNC_TECH.reactCall      - SEQUENCES_TECH.reactLoop.from, // 90
    observe:   SYNC_TECH.reactObserve   - SEQUENCES_TECH.reactLoop.from, // 150
    generates: SYNC_TECH.reactGenerates - SEQUENCES_TECH.reactLoop.from, // 225
    fadeOut:   SEQUENCES_TECH.reactLoop.duration - 20,                    // 235
  },
  chainOfThought: {
    fadeIn:    0,
    task:      SYNC_TECH.cotTask      - SEQUENCES_TECH.chainOfThought.from, // 30
    reasoning: SYNC_TECH.cotReasoning - SEQUENCES_TECH.chainOfThought.from, // 90
    output:    SYNC_TECH.cotOutput    - SEQUENCES_TECH.chainOfThought.from, // 165
    fadeOut:   SEQUENCES_TECH.chainOfThought.duration - 20,                 // 190
  },
  toolsMcp: {
    fadeIn:   0,
    server:   SYNC_TECH.mcpServer - SEQUENCES_TECH.toolsMcp.from, // 30
    arrow:    SYNC_TECH.mcpArrow  - SEQUENCES_TECH.toolsMcp.from, // 120
    result:   SYNC_TECH.mcpResult - SEQUENCES_TECH.toolsMcp.from, // 180
    fadeOut:  SEQUENCES_TECH.toolsMcp.duration - 20,               // 250
  },
  skills: {
    fadeIn:   0,
    file:     SYNC_TECH.skillFile  - SEQUENCES_TECH.skills.from, // 30
    arrow:    SYNC_TECH.skillArrow - SEQUENCES_TECH.skills.from, // 120
    fadeOut:  SEQUENCES_TECH.skills.duration - 20,               // 190
  },
  memoryTiers: {
    fadeIn:   0,
    table:    SYNC_TECH.memoryTable - SEQUENCES_TECH.memoryTiers.from, // 30
    rows:     SYNC_TECH.memoryRows  - SEQUENCES_TECH.memoryTiers.from, // 60
    fadeOut:  SEQUENCES_TECH.memoryTiers.duration - 20,                 // 190
  },
  autoregressive: {
    fadeIn:   0,
    formula:  SYNC_TECH.formula     - SEQUENCES_TECH.autoregressive.from, // 30
    tokens:   SYNC_TECH.tokensStart - SEQUENCES_TECH.autoregressive.from, // 75
    fadeOut:  SEQUENCES_TECH.autoregressive.duration - 20,                 // 175
  },
  fullPipeline: {
    fadeIn:   0,
    start:    SYNC_TECH.pipelineStart - SEQUENCES_TECH.fullPipeline.from, // 30
    final:    SYNC_TECH.pipelineFinal - SEQUENCES_TECH.fullPipeline.from, // 90
    // last scene — no fadeOut
  },
} as const;

// ─── Scene Data ───────────────────────────────────────────────────────────────

/** BPE tokenization example. */
export const BPE_EXAMPLE = {
  word: "Understanding",
  tokens: ["Under", "stand", "ing"],
  ids: [7736, 13264, 278],
} as const;

/** Context blocks — same 6 segments as dev. */
export const CONTEXT_BLOCKS_TECH = [
  { label: "System Prompt",  description: "Rules, persona, constraints",              color: "#475569", bg: "#F1F5F9" },
  { label: "Tool Schemas",   description: "JSON schemas of callable tools",            color: "#047857", bg: "#D1FAE5" },
  { label: "Memory",         description: "Persisted notes from prior turns",           color: "#B45309", bg: "#FEF3C7" },
  { label: "Skills",         description: "Instruction files at turn start",            color: "#6D28D9", bg: "#EDE9FE" },
  { label: "History",        description: "Prior messages in conversation",             color: "#0369A1", bg: "#E0F2FE" },
  { label: "New Message",    description: "What you just sent",                        color: "#4338CA", bg: "#EEF2FF" },
] as const;

/** Frame offset between each context block sliding in (local frames after `starts`). */
export const CONTEXT_BLOCK_STAGGER_TECH = 27;

/** Causal attention matrix size. */
export const MATRIX_SIZE_TECH = 8;

/** Chain-of-thought reasoning tokens. */
export const COT_REASONING_TOKENS = [
  "Let", "me", "break", "this", "down", "step", "by", "step",
] as const;

/** Final CoT answer tokens. */
export const COT_OUTPUT_TOKENS = ["The", "answer", "is:"] as const;

/** Memory tier table rows. */
export const MEMORY_TIERS = [
  { tier: "In-context",  scope: "This turn",          lifetime: "Single request"         },
  { tier: "Session",     scope: "This conversation",   lifetime: "Until session ends"     },
  { tier: "User",        scope: "All workspaces",      lifetime: "Permanent"              },
  { tier: "Repo",        scope: "Workspace-scoped",    lifetime: "Persistent (committed)" },
] as const;

/** Frame stagger between memory table rows appearing. */
export const MEMORY_ROW_STAGGER = 30;

/** Output tokens for the autoregressive generation scene. */
export const OUTPUT_TOKENS_TECH = [
  "The", "next", "token", "distribution", "is", "computed.", 
] as const;

/** Frame delay between each output token appearing. */
export const TOKEN_GEN_STAGGER_TECH = 10;

/** Full pipeline lines for the closing scene. */
export const TECH_PIPELINE_LINES = [
  "Tokenize  →  Assemble context  →  Transformer forward pass",
  "→  [Tool call?]  →  Execute  →  Inject  →  loop",
  "→  Generate autoregressively  →  Detokenize  →  Output",
] as const;

/** Frame stagger between pipeline line rows appearing. */
export const PIPELINE_LINE_STAGGER = 25;
