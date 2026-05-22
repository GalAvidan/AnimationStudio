// Scene 3 — Orchestrator (~15 s)
// Orchestrator box appears and highlights, then arrows fan down to four agent boxes.

import { makeScene2D, Rect, Txt, Line } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";
import { speakNarration } from "../utils/speak";

const ORCH_W = 500;
const ORCH_H = 90;
const ORCH_Y = -200;

const AGENT_NAMES = ["Researcher", "Coder", "Reviewer", "Writer"] as const;
const AGENT_W   = 200;
const AGENT_H   = 80;
const AGENT_GAP = 30;
const AGENTS_Y  = 100;

const TOTAL_AGENT_W = AGENT_NAMES.length * AGENT_W + (AGENT_NAMES.length - 1) * AGENT_GAP;
const FIRST_AGENT_X = -(TOTAL_AGENT_W / 2) + AGENT_W / 2;

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });
  view.add(bg);
  speakNarration("At the center sits the Orchestrator. It decomposes your task, routes each piece to a specialist agent, and never runs tools itself.");

  // Orchestrator box
  const orchRect = new Rect({
    x: 0,
    y: ORCH_Y,
    width: ORCH_W,
    height: ORCH_H,
    fill: COLORS.orchestrator,
    radius: 12,
    opacity: 0,
  });
  orchRect.add(
    new Txt({
      text: "Orchestrator Agent",
      fontSize: 36,
      fill: "#ffffff",
      fontFamily: "Inter, system-ui, sans-serif",
      fontWeight: 700,
    }),
  );
  view.add(orchRect);

  // Specialist agent boxes
  const agentBoxes = AGENT_NAMES.map((name, i) => {
    const x = FIRST_AGENT_X + i * (AGENT_W + AGENT_GAP);
    const box = new Rect({
      x,
      y: AGENTS_Y,
      width: AGENT_W,
      height: AGENT_H,
      fill: COLORS.agents,
      radius: 8,
      opacity: 0,
    });
    box.add(
      new Txt({
        text: name,
        fontSize: 24,
        fill: "#ffffff",
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 600,
      }),
    );
    view.add(box);
    return { box, x };
  });

  // Arrow lines from orchestrator bottom-center to each agent top-center
  const ORCH_BOTTOM_Y = ORCH_Y + ORCH_H / 2;
  const AGENT_TOP_Y   = AGENTS_Y - AGENT_H / 2;

  const arrows = agentBoxes.map(({ x }) =>
    new Line({
      points: [[0, ORCH_BOTTOM_Y], [x, AGENT_TOP_Y]],
      stroke: COLORS.orchestrator,
      lineWidth: 3,
      endArrow: true,
      arrowSize: 12,
      end: 0,
    }),
  );
  for (const arrow of arrows) view.add(arrow);

  const caption = new Txt({
    text: "Plans and routes — never runs tools directly",
    fontSize: 36,
    fill: COLORS.dim,
    fontFamily: "Inter, system-ui, sans-serif",
    y: 420,
    opacity: 0,
  });
  view.add(caption);

  // — Animate —

  yield* orchRect.opacity(1, 0.6, easeInOutCubic);
  yield* waitFor(0.5);

  // Highlight pulse
  yield* orchRect.fill("#ff5058", 0.25, easeInOutCubic);
  yield* orchRect.fill(COLORS.orchestrator, 0.25, easeInOutCubic);
  yield* waitFor(0.3);

  // Show agents
  for (const { box } of agentBoxes) {
    yield* box.opacity(1, 0.3, easeInOutCubic);
    yield* waitFor(0.1);
  }
  yield* waitFor(0.2);

  // Draw arrows simultaneously
  yield* all(...arrows.map(line => line.end(1, 0.5, easeOutCubic)));

  yield* waitFor(0.4);
  yield* caption.opacity(1, 0.5, easeInOutCubic);
  yield* waitFor(6.5);

  yield* all(
    orchRect.opacity(0, 0.4, easeInOutCubic),
    caption.opacity(0, 0.4, easeInOutCubic),
    ...agentBoxes.map(({ box }) => box.opacity(0, 0.4, easeInOutCubic)),
    ...arrows.map(a => a.opacity(0, 0.4, easeInOutCubic)),
  );
});
