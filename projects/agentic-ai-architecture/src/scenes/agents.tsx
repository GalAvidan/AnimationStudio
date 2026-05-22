// Scene 4 — Agents (~13 s)
// Five specialist agent boxes appear staggered, each with a capability sub-label.

import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, AGENT_DEFS } from "../data/beats-general";
import { speakNarration } from "../utils/speak";

const AGENT_W   = 280;
const AGENT_H   = 130;
const AGENT_GAP = 30;
const AGENTS_Y  = -30;

const TOTAL_W   = AGENT_DEFS.length * AGENT_W + (AGENT_DEFS.length - 1) * AGENT_GAP;
const FIRST_X   = -(TOTAL_W / 2) + AGENT_W / 2;

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });
  view.add(bg);
  speakNarration("Below it, specialist agents — Researcher, Coder, Reviewer, Writer — each own one narrow capability and are fully replaceable.");

  const agentNodes = AGENT_DEFS.map((agent, i) => {
    const x = FIRST_X + i * (AGENT_W + AGENT_GAP);

    const box = new Rect({
      x,
      y: AGENTS_Y,
      width: AGENT_W,
      height: AGENT_H,
      fill: COLORS.agents,
      radius: 10,
      opacity: 0,
    });

    box.add(
      new Txt({
        text: agent.label,
        fontSize: 30,
        fill: "#ffffff",
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 700,
        y: -22,
      }),
    );
    box.add(
      new Txt({
        text: agent.sub,
        fontSize: 20,
        fill: "rgba(255,255,255,0.7)",
        fontFamily: "Inter, system-ui, sans-serif",
        y: 24,
      }),
    );

    view.add(box);
    return box;
  });

  const caption = new Txt({
    text: "Each agent owns one narrow capability — and is fully replaceable",
    fontSize: 36,
    fill: COLORS.dim,
    fontFamily: "Inter, system-ui, sans-serif",
    y: 280,
    opacity: 0,
  });
  view.add(caption);

  // Stagger agent appearances
  for (const box of agentNodes) {
    yield* box.opacity(1, 0.35, easeInOutCubic);
    yield* waitFor(0.1);
  }

  yield* waitFor(0.4);
  yield* caption.opacity(1, 0.5, easeInOutCubic);
  yield* waitFor(6);

  yield* all(
    caption.opacity(0, 0.4, easeInOutCubic),
    ...agentNodes.map(b => b.opacity(0, 0.4, easeInOutCubic)),
  );
});
