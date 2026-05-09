# How a Chat AI Works — Technical Audience Script

## Working Title

End to end: tokenization to autoregressive generation

## Audience

Engineers and AI practitioners who want the full picture — no simplifications omitted.

## Target Runtime

~60 seconds

## Tone

Precise and fast-paced. Dense with information. Assumes comfort with transformers, JSON, probability.

---

## Script

Ten steps. No hand-waving.

---

**1 — Tokenization.**
Input text is split into sub-word tokens and mapped to integer IDs via a vocabulary table (~100k entries). The model operates entirely on integer sequences.

`[VISUAL: "Understanding" → BPE tokens → integer IDs]`

---

**2 — Context window assembly.**
A single flat sequence is constructed:

`[VISUAL: labeled sequence blocks building left to right]`
```
[System Prompt] [Tool Schemas] [Memory] [Skills / Instructions] [History] [New Message]
```
This is the complete model input. No implicit state. No out-of-band retrieval at inference time.

---

**3 — Transformer — causal attention.**
Causal masked scaled dot-product self-attention: token at position $i$ attends only to positions $\leq i$. The upper triangle of the attention matrix is masked to $-\infty$ before softmax. Future tokens are strictly invisible. Intent is not classified — it is emergent from the directed attention pattern over all prior tokens in context.

`[VISUAL: attention matrix heatmap — lower-triangular only, upper triangle zeroed out, high-weight pairs lighting up]`

---

**4 — ReAct loop (agentic mode).**
For multi-step tasks: Reason → Act → Observe, repeated.

`[VISUAL: loop — generate reasoning → structured tool call output → external execution → result injected into context → repeat]`

Each cycle extends the context window. The model "remembers" prior tool results only because they are now tokens in context.

---

**5 — Chain of Thought decomposition.**
When prompted or trained via instruction tuning to reason step-by-step, the model generates intermediate reasoning tokens before the final answer. This is not self-triggered by task complexity — it is elicited by explicit instructions in context or baked in via RLHF. In agentic mode this becomes visible: reasoning tokens appear in context and act as working memory.

`[VISUAL: task → system prompt "think step by step" → intermediate reasoning tokens → final output]`

---

**6 — Tools and MCP.**
Tool schemas are injected as JSON into context. Model outputs a structured call; host executes; result appended to context.

MCP (Model Context Protocol) standardizes this: external servers expose tools via JSON-RPC; the model sees them identically to built-in tools.

`[VISUAL: MCP server ↔ JSON-RPC ↔ host ↔ tool schema in context → model call → result]`

---

**7 — Skills as prompt injection.**
Skill files and instruction files are text injected into the system prompt segment. No fine-tuning. No LoRA. Behavioral shaping via in-context text at inference time.

`[VISUAL: skill file content flowing into the System Prompt block of the context window]`

---

**8 — Memory tiers.**
Four tiers: in-context (this turn), session (this conversation), user (permanent), repo (workspace-scoped). All implemented as files. Loaded into context window at the start of a turn.

`[VISUAL: four-tier table with lifetime and scope columns]`

---

**9 — Autoregressive generation.**
Token by token, left to right:

$$P(\text{token}_t \mid \text{token}_1, \ldots, \text{token}_{t-1}, \text{context})$$

Sampling controlled by temperature and top-p (nucleus sampling). Greedy decoding is temperature → 0.

`[VISUAL: probability distribution over vocabulary → sampled token appended → next step]`

---

**10 — The full pipeline.**

```
Tokenize → Assemble context → Transformer forward pass
→ [Tool call?] → Execute → Inject → loop
→ Generate autoregressively → Detokenize → Output
```

`[VISUAL: full pipeline diagram assembling beat by beat, then animating through]`

The model is a function: `f(context_tokens) → next_token_distribution`. Everything else is scaffolding.

---

## Notes

- Each beat is dense; keep on-screen duration short — 4 to 6 seconds per beat.
- Code blocks and formulas should appear as legible overlays, not decorative blur.
- The final pipeline diagram is the visual payoff — hold it longer (3–4s).
