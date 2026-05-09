// ─── Frame Rate & Total Length ────────────────────────────────────────────────

export const FPS = 30;
export const TOTAL_FRAMES = 1800; // 60 seconds

// ─── Sequence Ranges ──────────────────────────────────────────────────────────
// Each entry defines when a <Sequence> starts (global frame) and its duration.
// Sequences overlap slightly at boundaries so scenes can fade in/out smoothly.

export const SEQUENCES = {
  hook:             { from: 0,    duration: 180 }, // 0:00 – 0:06
  tokenization:     { from: 140,  duration: 270 }, // 0:04.67 – 0:13.67
  allSourcesTokens: { from: 380,  duration: 270 }, // 0:12.67 – 0:21.67
  contextWindow:    { from: 620,  duration: 270 }, // 0:20.67 – 0:29.67
  attention:        { from: 860,  duration: 270 }, // 0:28.67 – 0:37.67
  mathBridge:       { from: 1090, duration: 230 }, // 0:36.33 – 0:44.00
  generation:       { from: 1270, duration: 260 }, // 0:42.33 – 0:51.00
  detokenize:       { from: 1480, duration: 210 }, // 0:49.33 – 0:56.33
  pipeline:         { from: 1650, duration: 150 }, // 0:55.00 – 1:00.00
} as const;

// ─── Sync Points (global frames) ─────────────────────────────────────────────
// Named events from the spec, converted at 30fps. For reference only —
// use LOCAL_SYNC inside scene components.

export const SYNC = {
  sendPressed:          120, // 0:04
  tokenSplit:           180, // 0:06
  numberFlip:           270, // 0:09
  sourceRowsStart:      430, // 0:14.33
  sourceRowsMerge:      560, // 0:18.67
  contextStarts:        675, // 0:22.50
  yourMessageLands:     820, // 0:27.33
  attentionLinesAppear: 920, // 0:30.67
  patternForms:        1050, // 0:35.00
  mathBarsAppear:      1135, // 0:37.83
  mathChoice:          1230, // 0:41.00
  generationStarts:    1320, // 0:44.00
  detokenizeStarts:    1535, // 0:51.17
  detokenizeText:      1600, // 0:53.33
  pipelineAppears:     1665, // 0:55.50
  finalLine:           1730, // 0:57.67
} as const;

// ─── Local Sync Points ────────────────────────────────────────────────────────
// global frame minus the sequence's from value.
// Use these inside scene components where useCurrentFrame() starts at 0.

export const LOCAL_SYNC = {
  hook: {
    fadeIn:      0,
    sendPressed: SYNC.sendPressed - SEQUENCES.hook.from,        // 120
    fadeOut:     SEQUENCES.hook.duration - 20,                  // 160
  },
  tokenization: {
    fadeIn:  0,
    split:   SYNC.tokenSplit - SEQUENCES.tokenization.from,     // 40
    flip:    SYNC.numberFlip - SEQUENCES.tokenization.from,     // 130
    fadeOut: SEQUENCES.tokenization.duration - 20,              // 250
  },
  allSourcesTokens: {
    fadeIn:    0,
    rowsStart: SYNC.sourceRowsStart - SEQUENCES.allSourcesTokens.from, // 50
    merge:     SYNC.sourceRowsMerge - SEQUENCES.allSourcesTokens.from, // 180
    fadeOut:   SEQUENCES.allSourcesTokens.duration - 20,               // 250
  },
  contextWindow: {
    fadeIn:       0,
    starts:       SYNC.contextStarts    - SEQUENCES.contextWindow.from, // 55
    messageLands: SYNC.yourMessageLands - SEQUENCES.contextWindow.from, // 200
    fadeOut:      SEQUENCES.contextWindow.duration - 20,                // 250
  },
  attention: {
    fadeIn:   0,
    lines:    SYNC.attentionLinesAppear - SEQUENCES.attention.from,     // 60
    pattern:  SYNC.patternForms         - SEQUENCES.attention.from,     // 190
    fadeOut:  SEQUENCES.attention.duration - 20,                        // 250
  },
  mathBridge: {
    fadeIn:  0,
    bars:    SYNC.mathBarsAppear - SEQUENCES.mathBridge.from,          // 45
    choice:  SYNC.mathChoice     - SEQUENCES.mathBridge.from,          // 140
    fadeOut: SEQUENCES.mathBridge.duration - 20,                       // 210
  },
  generation: {
    fadeIn:  0,
    starts:  SYNC.generationStarts - SEQUENCES.generation.from,        // 50
    fadeOut: SEQUENCES.generation.duration - 20,                       // 240
  },
  detokenize: {
    fadeIn:  0,
    starts:  SYNC.detokenizeStarts - SEQUENCES.detokenize.from,        // 55
    text:    SYNC.detokenizeText   - SEQUENCES.detokenize.from,        // 120
    fadeOut: SEQUENCES.detokenize.duration - 20,                       // 190
  },
  pipeline: {
    fadeIn:    0,
    appears:   SYNC.pipelineAppears - SEQUENCES.pipeline.from,         // 15
    finalLine: SYNC.finalLine       - SEQUENCES.pipeline.from,         // 80
  },
} as const;

// ─── Scene Data ───────────────────────────────────────────────────────────────

/** The question typed in the hook scene. */
export const HOOK_QUESTION = "How does a chat AI work?";

/** Sub-words and integer IDs for the tokenization scene. */
export const SUBWORDS: Array<{ word: string; id: number }> = [
  { word: "Under", id: 1203 },
  { word: "stand", id: 892  },
  { word: "ing",   id: 44   },
];

// Pixel left positions of the three pills in their final spread state (scene width 1920px).
// Pill width ~180px. Three pills centered: (1920 - (3*180 + 2*40)) / 2 = 650px
export const PILL_FINAL_LEFT = [650, 870, 1090] as const;
export const PILL_START_LEFT = 860; // all start near horizontal center

/** Context window blocks shown in scene 3. */
export const CONTEXT_BLOCKS: Array<{ label: string; description: string; color: string; bg: string }> = [
  { label: "System Prompt", description: "Rules about who the AI is and how it should behave", color: "#475569", bg: "#F1F5F9" },
  { label: "History",       description: "Every prior message in this conversation",          color: "#0369A1", bg: "#E0F2FE" },
  { label: "Your Message",  description: "What you just typed",                               color: "#4338CA", bg: "#EEF2FF" },
];

// Frame offset between each context block sliding in (local frames after `starts`)
export const CONTEXT_BLOCK_STAGGER = 55;

/** Each context source becomes tokens before everything is assembled. */
export const SOURCE_TOKEN_ROWS = [
  {
    label: "Your Message",
    text: "How does a chat AI work?",
    tokens: ["How", "does", "a", "chat", "AI", "work", "?"],
    color: "#3B6FD4",
    bg: "#E8F0FE",
  },
  {
    label: "System Prompt",
    text: "Helpful, concise, follows rules",
    tokens: ["Helpful", "concise", "rules"],
    color: "#475569",
    bg: "#F1F5F9",
  },
  {
    label: "History",
    text: "Earlier turns in this chat",
    tokens: ["earlier", "chat", "turns"],
    color: "#0369A1",
    bg: "#E0F2FE",
  },
] as const;

/** Tokens displayed in the attention scene. */
export const ATTENTION_TOKENS = [
  "You", "type", "a", "question", "and", "hit", "Send", "↓",
] as const;

// Layout: 8 tokens, width=120px each, step=140px → total=1100px, startX=(1920-1100)/2=410
// Center X = startX + 60 + i*140
export const ATTENTION_TOKEN_X = [470, 610, 750, 890, 1030, 1170, 1310, 1450] as const;
export const ATTENTION_TOKEN_Y = 460;

/** Pairs to connect with attention arcs. Each entry: from/to index + visual weight 0–1. */
export const ATTENTION_PAIRS: Array<{ from: number; to: number; weight: number }> = [
  { from: 0, to: 3, weight: 0.95 }, // You ↔ question
  { from: 5, to: 6, weight: 0.92 }, // hit ↔ Send
  { from: 3, to: 6, weight: 0.85 }, // question ↔ Send
  { from: 0, to: 6, weight: 0.80 }, // You ↔ Send
  { from: 1, to: 3, weight: 0.60 }, // type ↔ question
  { from: 4, to: 5, weight: 0.55 }, // and ↔ hit
  { from: 0, to: 1, weight: 0.40 }, // You ↔ type
  { from: 2, to: 4, weight: 0.30 }, // a ↔ and
];

// Stagger between each arc appearing (local frames after attention.lines)
export const ARC_STAGGER = 12;

/** Tokens generated one-by-one in the generation scene. */
export const OUTPUT_TOKENS = [
  "What", "happens", "next", "isn't", "magic", "—", "it's", "math.",
] as const;

/** The readable sentence after output tokens are detokenized. */
export const DETOKENIZED_TEXT = "What happens next isn't magic — it's math.";

// Frames between each output token appearing
export const TOKEN_GEN_STAGGER = 14;

/** Candidate next-token scores shown in the math bridge scene. */
export const PROBABILITY_BARS = [
  { token: "math.", score: 74 },
  { token: "code.", score: 18 },
  { token: "magic.", score: 6 },
  { token: "coffee.", score: 2 },
] as const;

/** Steps in the pipeline flow diagram. */
export const PIPELINE_STEPS = [
  "Message", "Tokens", "Assemble", "Attention", "Output",
] as const;

/**
 * Optional subtitle shown under a specific pipeline step.
 * Key matches the label in PIPELINE_STEPS.
 */
export const PIPELINE_STEP_SUBTITLES: Partial<Record<string, string>> = {
  Assemble: "all sources → one token list",
};

// Frames between each pipeline step appearing
export const PIPELINE_STEP_STAGGER = 18;

/** The final punchline shown below the pipeline diagram. */
export const PUNCHLINE_LINES = [
  "No lookup table. No scripted reply.",
  "Just a very large matrix multiply,",
  "done billions of times,",
  "on a carefully built string of text.",
] as const;
