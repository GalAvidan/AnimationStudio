# How a Chat AI Works — General Audience Spec

## Project

- Project name: `project1-how-ai-chat-works`
- Composition name: `HowAiChatWorks_General`
- Source script: `scripts/project1-how-ai-chat-works_script-general.md`
- Target runtime: ~35 seconds
- Audience: General / curious non-technical
- Core message: When you hit Send, your words become numbers, get assembled into a single list the model reads all at once, and a response is predicted one piece at a time — no magic, just math.

---

## Visual Philosophy

Clean, minimal, high contrast. White background, dark text, one accent color per concept.

Motion should feel like a process *revealing itself* — each stage appears, does its job, then dims to give space to the next. Nothing decorates for its own sake. Every animation earns its place by making one idea clearer.

Pacing is calm but not slow. Viewers should feel like they're keeping up, not waiting.

If the animation were muted, the core idea should still be readable from the visuals alone.

---

## Beat Map

| Beat | Time | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|
| 1 — Hook | 0:00–0:05 | "You type a question and hit Send. What happens next isn't magic — it's math." | A simple text cursor types a question into a minimal chat input. The Send button pulses. | Establish the premise — demystify from frame one. |
| 2 — Tokenization | 0:05–0:13 | "First, your words are broken into small pieces called tokens. The model never reads text. It reads numbers." | The word "Understanding" splits into three pills: "Under" · "stand" · "ing". Each pill flips to reveal an integer ID beneath it. | Introduce tokenization visually — the key shift from human language to machine input. |
| 3 — Context Window | 0:13–0:21 | "Everything the model can see — your message, the rules it follows, the conversation history — is packed into a single list of tokens called the context window." | Labeled color blocks slide into a horizontal row, left to right: `System Prompt` · `History` · `Your Message`. The row fills a wide band across the screen. | Show that the model has one, flat, complete view — not separate channels. |
| 4 — Attention | 0:21–0:28 | "The model reads the entire context at once using a process called attention. Tokens that relate to each other pull together. A pattern forms." | Arcing lines appear between tokens in the row. Semantically related pairs glow brighter. Unrelated pairs fade. A web of weighted connections emerges. | Make attention tangible without math — it's about relevance pulling information together. |
| 5 — Generation | 0:28–0:33 | "From that pattern, the model generates one token at a time — predicting what comes next, then next, then next." | A response area fades in below. Token pills appear one by one, left to right, building a sentence. Each new pill appears as a soft pop. | Show autoregressive generation as a concrete, step-by-step act. |
| 6 — Punchline | 0:33–0:38 | "No lookup table. No scripted reply. Just a very large matrix multiply, done billions of times, on a carefully built string of text." | The full pipeline appears as a clean horizontal flow diagram: Message → Tokens → Context → Attention → Output. The final line fades in centered below. | Land the takeaway — demystify, not diminish. The "matrix multiply" line is the reward. |

---

## Key Moments

- **Beat 2 (token flip):** The flip from word to number is the visual punchline of the tokenization beat. It should feel like a reveal, not a slide.
- **Beat 3 (context row):** The blocks should land sequentially with a short delay between each, so the viewer can read the label before the next one arrives. `Your Message` is the last block and should land with slightly more weight.
- **Beat 4 (attention web):** Avoid making this feel like a network diagram. The lines should feel organic — light, arcing, purposeful — not a node-edge graph.
- **Beat 6 (pipeline diagram):** This is the payoff. Hold it for at least 3 seconds after the last element appears. The final line ("Just a very large matrix multiply…") should be the last thing the viewer reads.

---

## Narration Sync Points

| Sync point | Time | Visual event triggered |
|---|---:|---|
| `send-pressed` | 0:04 | Send button pulses, chat UI fades out |
| `token-split` | 0:06 | "Understanding" splits into three pills |
| `number-flip` | 0:09 | Pills flip to show integer IDs |
| `context-starts` | 0:14 | First context block (`System Prompt`) slides in |
| `your-message-lands` | 0:19 | `Your Message` block lands with emphasis |
| `attention-lines-appear` | 0:22 | First arcing attention lines appear |
| `pattern-forms` | 0:26 | Bright connections settle — web is complete |
| `generation-starts` | 0:29 | First output token pill appears |
| `pipeline-appears` | 0:33 | Full pipeline flow diagram fades in |
| `final-line` | 0:36 | Punchline text fades in below pipeline |

---

## Assets

- Existing assets: none
- Assets to create:
  - `TokenPill` — rounded pill, shows word or subword; animates flip to reveal integer ID
  - `ContextBlock` — labeled color band, one per context segment; slides in from left
  - `AttentionArc` — curved arc between two token positions; opacity and thickness encode weight
  - `PipelineStep` — a labeled box with a connecting arrow; assembles left to right
  - `ChatInput` — minimal input field + cursor; not a real UI, just a visual metaphor
- Fonts: clean sans-serif (system or Inter); no serif
- Colors:
  - Background: `#FFFFFF`
  - Text: `#111111`
  - Token pills: `#E8F0FE` (light blue fill) / `#3B6FD4` (border + text)
  - Number IDs: `#F3F0FF` (light purple fill) / `#6B40C4` (text) — distinct from word color
  - Context blocks: each segment gets its own muted color (e.g. slate, sky, indigo)
  - Attention lines: `#F59E0B` (amber) — warm, distinct from blue palette
  - Pipeline boxes: `#F0FDF4` (light green fill) / `#16A34A` (border)

---

## Constraints

- Runtime: ~35 seconds (±3s acceptable)
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps
- Must include: the word "tokens", the word "attention", the pipeline diagram, the punchline line
- Must avoid: jargon introduced without a visual explanation; decorative motion with no explanatory purpose; dark theme (this is the general audience version)

---

## Review Checklist

- [ ] Core message (math, not magic) lands by the end of Beat 1.
- [ ] Tokenization flip feels like a reveal, not a transition.
- [ ] Context window shows three distinct labeled segments in order.
- [ ] Attention arcs feel organic, not like a network diagram.
- [ ] Generation shows token-by-token output, not a full sentence appearing at once.
- [ ] Pipeline diagram holds for ≥3 seconds.
- [ ] Punchline is the last thing on screen.
- [ ] Every beat can be understood with the audio muted.
