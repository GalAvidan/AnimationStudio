import type { BeatTimeline } from "@studio/spec-types";

// ---- Color palette ----

export const COLORS = {
  bg:           "#0a0e1a",
  text:         "#ffffff",
  dim:          "#8090a8",
  user:         "#4a90d9",
  orchestrator: "#e13238",
  agents:       "#7ed321",
  skills:       "#f5a623",
  tools:        "#9b59b6",
  memory:       "#3a8a6e",
} as const;

// ---- Layer definitions (top → bottom in the architecture diagram) ----

export const LAYER_DEFS = [
  { id: "user",         label: "User / External API",   color: "#4a90d9" },
  { id: "orchestrator", label: "Orchestrator Agent",    color: "#e13238" },
  { id: "agents",       label: "Specialist Agents",     color: "#7ed321" },
  { id: "skills",       label: "Skills Layer",          color: "#f5a623" },
  { id: "tools",        label: "Tools Layer",           color: "#9b59b6" },
  { id: "memory",       label: "Memory & Knowledge",    color: "#3a8a6e" },
] as const;

// ---- Specialist agent definitions ----

export const AGENT_DEFS = [
  { id: "researcher", label: "Researcher", sub: "web-search · rag" },
  { id: "coder",      label: "Coder",      sub: "code-exec · file-io" },
  { id: "reviewer",   label: "Reviewer",   sub: "validate · critique" },
  { id: "writer",     label: "Writer",     sub: "docs · summaries" },
  { id: "executor",   label: "Executor",   sub: "terminal · scripts" },
] as const;

// ---- Full beat timeline (absolute times, 30 fps) ----

export const TIMELINE: BeatTimeline = {
  projectSlug: "agentic-ai-architecture",
  variantId:   "general",
  fps:         30,
  scenes: [
    {
      id: "intro",
      label: "Introduction",
      beats: [{
        id:        "intro",
        label:     "Intro",
        start:     0,
        end:       8,
        narration: "Modern AI doesn't just answer — it acts. Let's look at how agentic systems are structured.",
        visual:    "Title and subtitle fade in on dark background",
      }],
    },
    {
      id: "layers",
      label: "Seven layers",
      beats: [{
        id:        "layers",
        label:     "The seven layers",
        start:     8,
        end:       23,
        narration: "A modern agentic system has seven layers — each with a distinct job, from user requests at the top down to memory and tools at the bottom.",
        visual:    "Six color-coded layer rectangles build from bottom to top",
      }],
    },
    {
      id: "orchestrator",
      label: "Orchestrator",
      beats: [{
        id:        "orchestrator",
        label:     "The orchestrator",
        start:     23,
        end:       38,
        narration: "At the center sits the Orchestrator. It decomposes your task, routes each piece to a specialist agent, and never runs tools itself.",
        visual:    "Orchestrator box highlighted; arrows fan to four agent boxes",
      }],
    },
    {
      id: "agents",
      label: "Specialist agents",
      beats: [{
        id:        "agents",
        label:     "Specialist agents",
        start:     38,
        end:       51,
        narration: "Below it, specialist agents — Researcher, Coder, Reviewer, Writer — each own one narrow capability and are fully replaceable.",
        visual:    "Five agent boxes staggered in a row with capability sub-labels",
      }],
    },
    {
      id: "skills-tools",
      label: "Skills and tools",
      beats: [{
        id:        "skills-tools",
        label:     "Skills and tools",
        start:     51,
        end:       65,
        narration: "Agents call Skills. Skills combine tools into meaningful actions. Tools are the atomic boundary with the outside world.",
        visual:    "Horizontal chain with arrows: Agent → Skill → Tool → World",
      }],
    },
    {
      id: "takeaway",
      label: "Takeaway",
      beats: [{
        id:        "takeaway",
        label:     "Takeaway",
        start:     65,
        end:       78,
        narration: "Every boundary uses typed schemas. Every behavior is configuration-driven. Built to be observed, tested, and extended.",
        visual:    "Three bullet points appear one by one on dark background",
      }],
    },
  ],
  syncPoints: [],
};
