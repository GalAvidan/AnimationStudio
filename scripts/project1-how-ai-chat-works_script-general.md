# How a Chat AI Works — General Audience Script

## Working Title

What actually happens when you hit Send

## Audience

General / curious non-technical. Assumes no prior AI knowledge.

## Target Runtime

~35 seconds

## Tone

Clean, minimal, slightly wonder-inducing. 3Blue1Brown style — diagrams over decoration.

---

## Script

You type a question and hit Send.

What happens next isn't magic — it's math.

---

First, your words are broken into small pieces called **tokens**.
The model never reads text. It reads numbers.

`[VISUAL: "Understanding" → ["Under", "stand", "ing"] → [1203, 892, 44]]`

---

Everything the model can see — your message, the rules it follows, the conversation history — is packed into a single list of tokens called the **context window**.

`[VISUAL: flat sequence assembling: System Prompt | History | Your Message]`

---

The model reads the entire context at once using a process called **attention**.
Tokens that relate to each other pull together. A pattern forms.

`[VISUAL: tokens connecting with weighted lines, high-weight connections lighting up]`

---

From that pattern, the model generates one token at a time — predicting what comes next, then next, then next.

`[VISUAL: tokens appearing one-by-one, left to right]`

---

The result: words on your screen.

No lookup table. No scripted reply.
Just a very large matrix multiply, done billions of times, on a carefully built string of text.

`[VISUAL: full pipeline — message → tokens → context → attention → output tokens → text]`

---

## Notes

- Avoid jargon except where it's the point (token, context window, attention — all introduced visually).
- The "matrix multiply" line is the punchline: demystifying, not intimidating.
- Visual flow should feel like the pipeline assembling itself, then running.
