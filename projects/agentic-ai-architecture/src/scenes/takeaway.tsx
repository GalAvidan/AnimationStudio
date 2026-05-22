// Scene 6 — Takeaway (~13 s)
// Three design principles appear one by one as bullet points on a clean dark background.

import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";
import { speakNarration } from "../utils/speak";

const BULLETS = [
  "Typed schemas at every boundary",
  "Configuration-driven — behavior without code changes",
  "Built to be observed, tested, and extended",
] as const;

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });
  view.add(bg);
  speakNarration("Every boundary uses typed schemas. Every behavior is configuration-driven. Built to be observed, tested, and extended.");

  const heading = new Txt({
    text: "Built for production",
    fontSize: 64,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 700,
    y: -240,
    opacity: 0,
  });
  view.add(heading);

  const bulletNodes = BULLETS.map((text, i) =>
    new Txt({
      text: `• ${text}`,
      fontSize: 44,
      fill: COLORS.dim,
      fontFamily: "Inter, system-ui, sans-serif",
      y: -80 + i * 100,
      opacity: 0,
    }),
  );
  for (const node of bulletNodes) view.add(node);

  // — Animate —

  yield* heading.opacity(1, 0.7, easeInOutCubic);
  yield* waitFor(0.5);

  for (const node of bulletNodes) {
    yield* node.opacity(1, 0.5, easeInOutCubic);
    yield* waitFor(1.2);
  }

  yield* waitFor(2);

  yield* all(
    heading.opacity(0, 0.5, easeInOutCubic),
    ...bulletNodes.map(n => n.opacity(0, 0.5, easeInOutCubic)),
  );
});
