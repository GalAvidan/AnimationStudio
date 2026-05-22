// Scene 1 — Intro (~8 s)
// Title "Agentic AI Architecture" fades in, subtitle appears, then both fade out.

import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";
import { speakNarration } from "../utils/speak";

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });

  const title = new Txt({
    text: "Agentic AI Architecture",
    fontSize: 80,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    fontWeight: 700,
    opacity: 0,
    y: -40,
  });

  const subtitle = new Txt({
    text: "How modern multi-agent systems are built",
    fontSize: 38,
    fill: COLORS.dim,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 60,
  });

  view.add(bg);
  speakNarration("Modern AI doesn't just answer — it acts. Let's look at how agentic systems are structured.");
  view.add(title);
  view.add(subtitle);

  yield* title.opacity(1, 0.8, easeInOutCubic);
  yield* waitFor(0.3);
  yield* subtitle.opacity(1, 0.6, easeInOutCubic);
  yield* waitFor(4.5);
  yield* all(
    title.opacity(0, 0.5, easeInOutCubic),
    subtitle.opacity(0, 0.5, easeInOutCubic),
  );
});
