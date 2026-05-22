# Script: Agentic AI Architecture — General Audience

## Working Title

How modern multi-agent AI systems are structured, and why that structure matters.

## Audience

Software engineers and technically curious builders who have heard about "agentic AI" but want a clear mental model of how it is assembled.

## Target Runtime

~75 seconds

## Tone

Calm, confident, lightly technical. Diagram-forward. No jargon without a brief definition.

---

## Script

Modern AI doesn't just answer — it acts.

[VISUAL: Title "Agentic AI Architecture" fades in on dark background; subtitle "How modern multi-agent systems are built" appears below]

---

A modern agentic system is built in layers. At the top, the user or an external API sends a task. At the bottom, memory and knowledge stores hold everything the system has ever learned.

[VISUAL: Six color-coded layer rectangles build from bottom to top — Memory & Knowledge, Tools, Skills, Specialist Agents, Orchestrator Agent, User/External API]

---

At the center sits the Orchestrator Agent. It decomposes your task into sub-tasks, decides which specialist handles each one, and routes the work — but it never runs tools directly itself.

[VISUAL: Orchestrator box highlights; arrows fan down to four specialist agent boxes]

---

Below it, specialist agents — Researcher, Coder, Reviewer, Writer — each own one narrow capability. They're fully interchangeable. Swap one out and the orchestrator never notices.

[VISUAL: Five agent boxes appear staggered in a row, each with a capability sub-label]

---

Agents call Skills. Skills combine one or more tools into a meaningful action. Tools are the atomic boundary: one tool, one external system — a database, a browser, a file, an API.

[VISUAL: Horizontal chain with connecting arrows — Agent → Skill → Tool → World]

---

Every boundary uses typed schemas. Every behavior is configuration-driven. Agentic AI built to be observed, tested, and extended.

[VISUAL: Three bullet points appear one by one on a clean dark background]
