# How a Chat AI Works — Technical Audience Spec

## Project

- Project name: `project1-how-ai-chat-works`
- Composition name: `HowAiChatWorks-Technical`
- Source script: `scripts/project1-how-ai-chat-works_script-technical.md`
- Target runtime: ~60 seconds
- Audience: Engineers and AI practitioners — comfortable with transformers, JSON, probability
- Core message: The model is a function `f(context_tokens) → next_token_distribution`. Everything else is scaffolding.

---

## Visual Philosophy

Dense, information-rich. Every beat is 5–6 seconds. No hand-holding — formulas, code blocks, and architecture diagrams are first-class visuals. The viewer can pause; nothing is hidden behind metaphor.

White background, monospace for code/formulas, clean sans-serif for labels. Same accent palette as general/dev but used more precisely — each concept has its own color, consistently applied.

The final pipeline diagram is the payoff. It should assemble beat by beat and hold for a full 3–4 seconds at the end.

---

## Beat Map

| Beat | Time | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 1 — Tokenization | 0:00–0:07 | "Input text is split into sub-word tokens via BPE and mapped to integer IDs. The model operates entirely on integer sequences." | "Understanding" → BPE pills: "Under" · "stand" · "ing" → integer ID cards: 7736 · 13264 · 278 | Establish the token abstraction |
| 2 — Context window | 0:05.5–0:12.5 | "A single flat sequence: System Prompt · Tool Schemas · Memory · Skills · History · New Message. This is the complete model input. No implicit state." | Six labeled blocks building L→R as a labeled sequence | Show the full input — 6 segments, not 3 |
| 3 — Causal attention | 0:11.5–0:18.5 | "Causal masked scaled dot-product self-attention. Token at position i attends only to positions ≤ i. Upper triangle masked to −∞ before softmax. Intent is emergent from directed attention over all prior context." | 8×8 attention matrix heatmap. Lower triangle: colored cells. Upper triangle: clearly zeroed (gray). Diagonal lighting up in sequence. | The core attention mechanism, no simplification |
| 4 — ReAct loop | 0:17.5–0:26 | "For multi-step tasks: Reason → Act → Observe, repeated. Each cycle extends the context window. The model 'remembers' prior tool results only because they are now tokens in context." | Loop diagram: generate reasoning → structured call → external execution → result injected → repeat | Agentic mode and memory via context extension |
| 5 — Chain of Thought | 0:25–0:32 | "When prompted or trained via instruction tuning to reason step-by-step, the model generates intermediate reasoning tokens before the final answer. This is elicited by explicit instructions — it is not self-triggered by task complexity." | Task input → system prompt "think step by step" → intermediate reasoning tokens (muted) → final answer token | CoT as instruction-driven, not autonomous |
| 6 — Tools & MCP | 0:31–0:40.5 | "Tool schemas are injected as JSON into context. MCP standardizes this via JSON-RPC: external servers expose tools identically to built-in tools." | MCP server box ↔ JSON-RPC arrows ↔ host ↔ tool schema in context → model call → result appended | Architecture of tool use, including MCP |
| 7 — Skills | 0:39–0:46.5 | "Skill files and instruction files are text injected into the system prompt segment. No fine-tuning. No LoRA. Behavioral shaping via in-context text at inference time." | Skill file card → arrow → System Prompt block in context window | Demystify "skills" — it's just text in context |
| 8 — Memory tiers | 0:46–0:53 | "Four memory tiers: in-context, session, user, and repo. All implemented as files. Loaded into context window at turn start." | Four-row table: Tier / Scope / Lifetime. Rows appear one by one. | Make the memory model concrete and complete |
| 9 — Autoregressive generation | 0:52.5–0:59 | "Token by token, left to right. Sampling controlled by temperature and top-p. Greedy decoding is temperature → 0." | Probability formula P(token_t | token_1…token_{t-1}, context). Then token pills streaming in. | The generation algorithm |
| 10 — Full pipeline | 0:56–1:00 | "The model is a function: f(context_tokens) → next_token_distribution. Everything else is scaffolding." | Multi-line pipeline assembling beat by beat, then held for 3–4 seconds. Final caption fades in. | The complete picture — visual payoff |

---

## Key Moments

- **Beat 1 (BPE flip):** The flip from text token to integer is the punchline of the tokenization beat. Hold the integer ID state for 2+ seconds.
- **Beat 3 (attention matrix):** Use an 8×8 grid, not a tiny square. Lower triangle cells animate with a sweep from top-left to bottom-right. Upper triangle cells should render at ~15% opacity — visibly present but clearly disabled. The formula for causal masking appears as a small overlay.
- **Beat 4 (ReAct loop):** Loop arrow completes 1.5 cycles to convey iteration. The context window extending on each cycle is key.
- **Beat 5 (CoT):** Reasoning tokens appear in a muted color, visually subordinate to the final output token.
- **Beat 6 (MCP):** Three layers: server → JSON-RPC → host. The host contains the context window. The model sits inside the context.
- **Beat 8 (memory table):** Table rows appear with a 30-frame stagger. Scope and lifetime columns are visible immediately for the first row before the next row appears.
- **Beat 10 (pipeline):** Each line of the pipeline appears sequentially. The final caption is the last thing on screen. Hold for at least 3 seconds.

---

## Narration Sync Points

| Sync point | Time | Visual event triggered |
|---|---:|---|
| `token-split` | 0:01.3 | "Understanding" splits into 3 BPE pills |
| `bpe-ids` | 0:03.5 | Pills flip to integer ID cards |
| `context-starts` | 0:06.5 | First context block (System Prompt) slides in |
| `context-all-landed` | 0:10.7 | All 6 blocks visible |
| `matrix-in` | 0:12.5 | 8×8 attention matrix fades in |
| `lower-tri-lights` | 0:14 | Lower triangle cells animate |
| `upper-mask` | 0:15.5 | Upper triangle explicitly grayed |
| `react-think` | 0:18.5 | "Reason" box appears |
| `react-call` | 0:20.5 | "Act" box and arrow appear |
| `react-observe` | 0:22.5 | "Observe" box and return arrow appear |
| `react-generates` | 0:25 | Loop exits to "Generate" |
| `cot-task` | 0:26 | Task input appears |
| `cot-reasoning` | 0:28 | Intermediate reasoning tokens appear (muted) |
| `cot-output` | 0:30.5 | Final answer token appears (highlighted) |
| `mcp-server` | 0:32 | MCP server box appears |
| `mcp-arrow` | 0:35 | JSON-RPC arrows appear |
| `mcp-result` | 0:37 | Result appended to context |
| `skill-file` | 0:40 | Skill file card slides in |
| `skill-arrow` | 0:43 | Arrow flows to system prompt block |
| `memory-table` | 0:46 | Table header appears |
| `memory-rows` | 0:47 | Rows appear one by one (staggered) |
| `formula` | 0:52 | Probability formula appears |
| `tokens-start` | 0:53.5 | Token pills stream in |
| `pipeline-start` | 0:57 | Pipeline lines begin assembling |
| `pipeline-final` | 0:59 | Final caption fades in |

---

## Assets

- Existing components (reused): `ContextBlock`, `TokenPill`, `PipelineStep`
- Shared scenes (with props): `ContextAssemblyScene`, `ReactLoopScene`, `AutoregressiveScene`
- Technical-specific scenes: `TokenizationDetailScene`, `CausalAttentionMatrixScene`, `ChainOfThoughtScene`, `ToolsMcpScene`, `SkillsScene`, `MemoryTiersScene`, `TechPipelineScene`

### Color Palette (same as dev, plus)

| Concept | Text color | Background |
|---|---|---|
| System Prompt | `#475569` | `#F1F5F9` |
| Tool Schemas | `#047857` | `#D1FAE5` |
| Memory | `#B45309` | `#FEF3C7` |
| Skills | `#6D28D9` | `#EDE9FE` |
| History | `#0369A1` | `#E0F2FE` |
| New Message | `#4338CA` | `#EEF2FF` |
| Matrix active cell | `#3B6FD4` | `#DBEAFE` |
| Matrix inactive cell | — | `#F3F4F6` |
| CoT reasoning tokens | `#9CA3AF` | `#F9FAFB` |
| MCP server box | `#B45309` | `#FEF3C7` |
| JSON / code text | `#059669` | — |
| Formula | `#111111` | — |

### Visual Notes

- Attention matrix: use `opacity` + `background` to encode attention weight; cell (i, j) where j > i always renders as `#F3F4F6` at 20% opacity.
- Pipeline: the final diagram has 3 lines (Tokenize → Assemble → Transform; → Tool call? → Execute → Inject → loop; → Autoregressively generate → Detokenize → Output). Each line is a `PipelineStep` row.
- All code/formula overlays use `fontFamily: "monospace"`.
