// Scene 5 — Skills & Tools (~14 s)
// Horizontal chain: Agent box → Skill box → Tool box → World box, connected by arrows.
// Boxes appear left-to-right, then arrows draw in, then the World box fades in.

import { makeScene2D, Rect, Txt, Line } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";
import { speakNarration } from "../utils/speak";

// Four evenly-spaced centers across the canvas
// Step = 320, so centers at: -480, -160, 160, 480
const BOX_W = 220;
const BOX_H = 110;
const STEP  = 320;
const CHAIN_Y = -60;

const CHAIN_BOXES = [
  { label: "Agent",  sub: "calls skills",          color: COLORS.agents },
  { label: "Skill",  sub: "combines tools",         color: COLORS.skills },
  { label: "Tool",   sub: "one external boundary",  color: COLORS.tools  },
] as const;

// World box is a separate outlined rectangle
const WORLD_X = 480;

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });
  view.add(bg);
  speakNarration("Agents call Skills. Skills combine tools into meaningful actions. Tools are the atomic boundary with the outside world.");

  // Main chain boxes (Agent, Skill, Tool) at x = -480, -160, 160
  const boxes = CHAIN_BOXES.map((item, i) => {
    const x = -480 + i * STEP;
    const box = new Rect({
      x,
      y: CHAIN_Y,
      width: BOX_W,
      height: BOX_H,
      fill: item.color,
      radius: 10,
      opacity: 0,
    });
    box.add(
      new Txt({
        text: item.label,
        fontSize: 34,
        fill: "#ffffff",
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 700,
        y: -14,
      }),
    );
    box.add(
      new Txt({
        text: item.sub,
        fontSize: 20,
        fill: "rgba(255,255,255,0.75)",
        fontFamily: "Inter, system-ui, sans-serif",
        y: 20,
      }),
    );
    view.add(box);
    return { box, x };
  });

  // World box (outlined, no fill)
  const worldBox = new Rect({
    x: WORLD_X,
    y: CHAIN_Y,
    width: 220,
    height: 100,
    fill: "rgba(255,255,255,0.04)",
    stroke: "#ffffff",
    lineWidth: 2,
    radius: 10,
    opacity: 0,
  });
  worldBox.add(
    new Txt({
      text: "World",
      fontSize: 30,
      fill: "#ffffff",
      fontFamily: "Inter, system-ui, sans-serif",
      fontWeight: 700,
      y: -12,
    }),
  );
  worldBox.add(
    new Txt({
      text: "APIs · DBs · files",
      fontSize: 18,
      fill: "rgba(255,255,255,0.7)",
      fontFamily: "Inter, system-ui, sans-serif",
      y: 18,
    }),
  );
  view.add(worldBox);

  // Connecting arrows between boxes (Agent→Skill, Skill→Tool, Tool→World)
  // Each arrow spans 100 px (step − box_w = 320 − 220 = 100)
  const ARROW_PAIRS: [[number, number], [number, number]][] = [
    [[-480 + BOX_W / 2, CHAIN_Y], [-160 - BOX_W / 2, CHAIN_Y]],
    [[-160 + BOX_W / 2, CHAIN_Y], [ 160 - BOX_W / 2, CHAIN_Y]],
    [[ 160 + BOX_W / 2, CHAIN_Y], [WORLD_X - 110,    CHAIN_Y]],
  ];

  const arrows = ARROW_PAIRS.map(([from, to]) =>
    new Line({
      points: [from, to],
      stroke: "#ffffff",
      lineWidth: 3,
      endArrow: true,
      arrowSize: 14,
      end: 0,
    }),
  );
  for (const arrow of arrows) view.add(arrow);

  const caption = new Txt({
    text: "Tools are stateless — one tool, one external boundary",
    fontSize: 34,
    fill: COLORS.dim,
    fontFamily: "Inter, system-ui, sans-serif",
    y: 290,
    opacity: 0,
  });
  view.add(caption);

  // — Animate —

  // Show chain boxes left-to-right
  for (const { box } of boxes) {
    yield* box.opacity(1, 0.4, easeInOutCubic);
    yield* waitFor(0.1);
  }
  yield* waitFor(0.2);

  // Draw connecting arrows simultaneously
  yield* all(...arrows.map(a => a.end(1, 0.5, easeOutCubic)));
  yield* waitFor(0.15);

  // Reveal World box
  yield* worldBox.opacity(1, 0.4, easeInOutCubic);
  yield* waitFor(0.4);

  yield* caption.opacity(1, 0.5, easeInOutCubic);
  yield* waitFor(7);

  yield* all(
    caption.opacity(0, 0.4, easeInOutCubic),
    worldBox.opacity(0, 0.4, easeInOutCubic),
    ...boxes.map(({ box }) => box.opacity(0, 0.4, easeInOutCubic)),
    ...arrows.map(a => a.opacity(0, 0.4, easeInOutCubic)),
  );
});
