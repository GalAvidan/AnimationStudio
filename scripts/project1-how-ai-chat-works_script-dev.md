# How a Chat AI Works — Developer Audience Script

## Working Title

The agentic loop: from message to response

## Audience

Developers familiar with software but new to LLM internals.

## Target Runtime

~55 seconds

## Tone

Direct, technical-but-grounded. Treats the viewer as an engineer who wants the real model, not a metaphor.

---

## Script

When you send a message to a chat AI, here is what is actually executing.

---

**Step 1 — Context assembly.**

The model receives one input: a flat token sequence called the context window.

`[VISUAL: context window building up: System Prompt | Tool Schemas | Memory | Skills | History | New Message]`

This is the *only* input. No database. No hidden state. Everything fits in one prompt.

---

**Step 2 — Transformer forward pass.**

Each token attends to all *preceding* tokens via a causal mask — attention is strictly left-to-right. Future tokens are invisible. Patterns in the prior sequence activate response patterns from training.

`[VISUAL: attention matrix — lower-triangular mask, each token connecting only to tokens before it, weights glowing by relevance]`

Intent isn't extracted by a classifier. It's **emergent from the directed attention pattern over all prior context**.

---

**Step 3 — Tool call or generate?**

For simple questions: generate the answer directly.

For complex tasks: the model runs a **ReAct loop** — Reason, Act, Observe.

`[VISUAL: loop diagram — Think → Call Tool → Observe result → loop back → Generate]`

Each tool call pauses generation, executes externally, injects the result back into context, and resumes.

---

**Step 4 — Tools.**

Tools are JSON schemas in the context. The model outputs a structured JSON blob; the host executes it; the result is appended to context.

`[VISUAL: tool schema card → model outputs JSON → result injected back into context window]`

From the model's perspective: it's just more tokens.

---

**Step 5 — Response.**

Once context is rich enough, the model generates the final response autoregressively — one token at a time.

$$P(\text{token}_t \mid \text{all prior tokens})$$

`[VISUAL: tokens appearing one-by-one, output stream → detokenize → readable text]`

---

The whole system is a loop over token prediction, grounded by a carefully constructed context string.

`[VISUAL: full pipeline — assemble context → attention → ReAct loop or generate → output]`

---

## Notes

- The ReAct loop beat is the key insight for developers: they often assume the model "knows" without realizing tool results re-enter context.
- The tool schema → JSON output → result injection beat is important: demystifies "tool use" as just structured text.
- Math formula shown briefly — not explained, just labeled.
