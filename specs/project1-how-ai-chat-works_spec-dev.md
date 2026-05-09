# How a Chat AI Works — Developer Audience Spec

## Project

- Project name: `project1-how-ai-chat-works`
- Composition name: `HowAiChatWorks-Dev`
- Source script: `scripts/project1-how-ai-chat-works_script-dev.md`
- Target runtime: ~55 seconds
- Audience: Developers familiar with software, new to LLM internals
- Core message: A chat AI is a context window, a transformer forward pass, and a token prediction loop — everything else is scaffolding.

---

## Visual Philosophy

Same clean, high-contrast white-background style as the general version. More information density per frame — labels, data structures, and code-style visuals are expected. Less metaphor, more mechanism.

Pacing is brisk. Each beat establishes a concept quickly, holds it for 2–3 seconds, then moves on.

Code-style visuals (JSON blocks, schema cards, formula overlays) should appear legible and precise, not decorative.

---

## Beat Map

| Beat | Time | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 0 — Opening | 0:00–0:04 | "When you send a message to a chat AI, here is what is actually executing." | Centered text: "message → model" with a minimal terminal cursor | Set tone: direct, technical |
| 1 — Context assembly | 0:04–0:16 | "The model receives one input: a flat token sequence called the context window. This is the only input. No database. No hidden state. Everything fits in one prompt." | Six labeled blocks build L→R: System Prompt · Tool Schemas · Memory · Skills · History · New Message | Show the complete, flat model input |
| 2 — Transformer forward pass | 0:16–0:27 | "Each token attends to all preceding tokens via a causal mask — attention is strictly left-to-right. Intent is emergent from the directed attention pattern over all prior context." | Lower-triangular 6×6 grid. Upper triangle dimmed. Cells in lower triangle brighten sequentially. | Explain causal attention without full math — the mechanism, not the formula |
| 3 — ReAct loop | 0:27–0:41 | "For complex tasks, the model runs a ReAct loop: Reason, Act, Observe. Each tool call pauses generation, executes externally, injects the result back into context, and resumes." | Loop diagram: Think → Call Tool → Observe Result → (arrow back to Think). Then: Generate exit arrow. | Introduce agentic mode and the ReAct pattern |
| 4 — Tools | 0:41–0:49 | "Tools are JSON schemas in the context. The model outputs a structured JSON blob; the host executes it; the result is appended to context. From the model's perspective: it's just more tokens." | Tool schema card (left) → arrow → JSON output blob (center) → arrow → context row with result injected (right) | Make the tool mechanism concrete |
| 5 — Generation | 0:49–0:55 | "Once context is rich enough, the model generates the final response autoregressively — one token at a time. The whole system is a loop over token prediction, grounded by a carefully constructed context string." | Probability formula. Then tokens stream in one by one. Final caption fades in. | Land the mathematical takeaway |

---

## Key Moments

- **Beat 1 (context row):** Six blocks, not three. Each block gets ~1.5 seconds to land before the next. "New Message" is last and lands with extra emphasis.
- **Beat 2 (attention grid):** 6×6 grid. Cells below the diagonal animate from dim to bright in row-by-row order. Cells above the diagonal are flat gray, clearly disabled.
- **Beat 3 (ReAct loop):** Loop arrow cycles fully before the "Generate" exit appears. The iterative cycling conveys the repeated nature.
- **Beat 4 (tools):** Three steps appear in clear sequence: schema card first, then model output JSON, then context row with result.
- **Beat 5 (formula):** P(token_t | all prior tokens) appears before the token stream. The formula grounds the visual.

---

## Narration Sync Points

| Sync point | Time | Visual event triggered |
|---|---:|---|
| `opening-settled` | 0:02.7 | Opening text at rest |
| `context-starts` | 0:05 | First block (System Prompt) slides in |
| `context-all-landed` | 0:14.2 | All 6 blocks visible |
| `attention-grid-in` | 0:15.7 | Attention grid appears |
| `lower-tri-lights` | 0:18 | Lower triangle cells brighten |
| `react-think` | 0:27.7 | "Think" box appears |
| `react-call` | 0:31 | "Call Tool" box and arrow appear |
| `react-observe` | 0:34.3 | "Observe Result" box and return arrow appear |
| `react-generates` | 0:38 | "Generate" exit path appears |
| `tool-schema-in` | 0:41.3 | Tool schema card slides in |
| `tool-json-out` | 0:44 | Model JSON output blob appears |
| `tool-result-injected` | 0:46.7 | Result injected into context row |
| `formula-appears` | 0:49.7 | Probability formula fades in |
| `tokens-start` | 0:51.3 | First output token appears |
| `final-caption` | 0:52.7 | Closing caption fades in |

---

## Assets

- Existing components (reused): `ContextBlock`, `PipelineStep`, `TokenPill`
- New shared scenes: `ContextAssemblyScene`, `ReactLoopScene`, `AutoregressiveScene`
- Dev-specific scenes: `TransformerPassScene`, `ToolsDevScene`, `DevPipelineScene`

### Color Palette (extending general)

| Segment | Text color | Background |
|---|---|---|
| System Prompt | `#475569` | `#F1F5F9` |
| Tool Schemas | `#047857` | `#D1FAE5` |
| Memory | `#B45309` | `#FEF3C7` |
| Skills | `#6D28D9` | `#EDE9FE` |
| History | `#0369A1` | `#E0F2FE` |
| New Message | `#4338CA` | `#EEF2FF` |
| Matrix cells (active) | `#3B6FD4` | `#E8F0FE` |
| Matrix cells (inactive) | — | `#F3F4F6` |
| JSON text | `#059669` | — |
| Formula | `#111111` | — |
