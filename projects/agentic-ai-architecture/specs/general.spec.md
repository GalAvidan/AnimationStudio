# Spec: Agentic AI Architecture — General Audience

## Project

- **Slug:** `agentic-ai-architecture`
- **Composition ID:** `AgenticAiArchitectureGeneral`
- **Source script:** `scripts/general.script.md`
- **Target runtime:** ~75 seconds
- **Audience:** Software engineers and technically curious builders
- **Core message:** Agentic AI systems are layered, typed, and configuration-driven — each layer has one clear job.

---

## Visual Philosophy

Dark navy background (`#0a0e1a`) throughout. Clean flat-color rectangles — no gradients, no shadows. Color coding: blue for User/API, red for Orchestrator, green for Agents, orange for Skills, purple for Tools, teal for Memory. Typeset in Inter or system-ui sans-serif, weight 600–700 for labels. Motion is calm and purposeful — elements build in one at a time, never cluttered. Fade transitions at scene boundaries.

---

## Beat Map

| Beat | Duration | Speaker | Emotion | Narration | What the viewer sees | Purpose |
|---|---:|---|---|---|---|---|
| 1 — intro | 8s | | curious | "Modern AI doesn't just answer — it acts. Let's look at how agentic systems are structured." | Title and subtitle fade in and out on dark background | Hook the viewer; set the scope |
| 2 — layers | 15s | | calm | "A modern agentic system has seven layers — each with a distinct job, from user requests at the top down to memory and tools at the bottom." | Six labeled color-coded layer rectangles build from bottom to top | Establish the full architecture at once |
| 3 — orchestrator | 15s | | focused | "At the center sits the Orchestrator. It decomposes your task, routes each piece to a specialist agent, and never runs tools itself." | Orchestrator box highlights; arrows fan down to four specialist agent boxes below | Show the routing intelligence |
| 4 — agents | 13s | | warm | "Below it, specialist agents — Researcher, Coder, Reviewer, Writer — each own one narrow capability and are fully replaceable." | Five agent boxes appear staggered in a row with capability sub-labels | Show modularity and interchangeability |
| 5 — skills-tools | 14s | | technical | "Agents call Skills. Skills combine tools into meaningful actions. Tools are the atomic boundary with the outside world." | Horizontal chain with connecting arrows: Agent → Skill → Tool → World | Clarify the layered abstraction |
| 6 — takeaway | 10s | | confident | "Every boundary uses typed schemas. Every behavior is configuration-driven. Built to be observed, tested, and extended." | Three bullet points appear one by one on a clean dark background | Land the design principles |

---

## Assets

- Existing assets: none
- Assets to create:
  - Layer rectangles — flat color, 1400×100px, 8px border radius, centered white label
  - Orchestrator box — flat red (`#e13238`), 500×90px, 12px border radius
  - Agent boxes — flat green (`#7ed321`), 200×80px, 8px border radius (orchestrator scene) and 280×130px (agents scene)
  - Chain boxes — Agent green, Skill orange, Tool purple, World outlined white; 220×110px
  - Arrow lines — 3px stroke, arrowhead at end, colored to match the source layer
- Fonts: Inter, system-ui, sans-serif
- Colors:
  - Background: `#0a0e1a`
  - Text primary: `#ffffff`
  - Text secondary / dim: `#8090a8`
  - User/API: `#4a90d9`
  - Orchestrator: `#e13238`
  - Agents: `#7ed321`
  - Skills: `#f5a623`
  - Tools: `#9b59b6`
  - Memory: `#3a8a6e`

---

## Constraints

- Runtime: ~75 seconds (±5s acceptable)
- Aspect ratio: 16:9
- Resolution: 1920×1080
- Frame rate: 30fps
- Must include: Orchestrator routing arrows; Agent → Skill → Tool chain
- Must avoid: Code snippets; transitions that distract from narration rhythm

---

## Review Checklist

- [x] Core message lands within the first third of the runtime.
- [x] Every beat can be understood with audio muted.
- [x] No code, frame numbers, or component props appear in this spec.
- [x] Constraints are complete.
