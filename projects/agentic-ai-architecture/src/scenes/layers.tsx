// Scene 2 — Layers (~15 s)
// Six color-coded layer rectangles build from bottom to top, then a caption appears.

import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, LAYER_DEFS } from "../data/beats-general";
import { speakNarration } from "../utils/speak";

const LAYER_W = 1400;
const LAYER_H = 100;
const STEP    = LAYER_H + 12;                                // height + gap
const TOTAL_H = LAYER_DEFS.length * LAYER_H + (LAYER_DEFS.length - 1) * 12;
const FIRST_Y = -(TOTAL_H / 2) + LAYER_H / 2;              // y of top-most layer center

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });
  view.add(bg);
  speakNarration("A modern agentic system has seven layers — each with a distinct job, from user requests at the top down to memory and tools at the bottom.");

  const caption = new Txt({
    text: "Six layers — each with a distinct job",
    fontSize: 38,
    fill: COLORS.dim,
    fontFamily: "Inter, system-ui, sans-serif",
    y: 470,
    opacity: 0,
  });
  view.add(caption);

  const rects = LAYER_DEFS.map((layer, i) => {
    const rect = new Rect({
      x: 0,
      y: FIRST_Y + i * STEP,
      width: LAYER_W,
      height: LAYER_H,
      fill: layer.color,
      radius: 8,
      opacity: 0,
    });
    rect.add(
      new Txt({
        text: layer.label,
        fontSize: 30,
        fill: "#ffffff",
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 600,
      }),
    );
    view.add(rect);
    return rect;
  });

  // Build layers from bottom to top (reverse order)
  for (let i = rects.length - 1; i >= 0; i--) {
    yield* rects[i].opacity(1, 0.35, easeInOutCubic);
    yield* waitFor(0.08);
  }

  yield* waitFor(0.4);
  yield* caption.opacity(1, 0.5, easeInOutCubic);
  yield* waitFor(7);

  yield* all(
    caption.opacity(0, 0.4, easeInOutCubic),
    ...rects.map(r => r.opacity(0, 0.4, easeInOutCubic)),
  );
});
