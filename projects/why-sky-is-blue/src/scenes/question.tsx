import { makeScene2D, Rect, Circle, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";

// Beat 1 — The question (~5s)
// Sun rises from lower-left while "Why is the sky blue?" fades in, holds, fades out.

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });

  // Subtle sky tint across the top half
  const skyTint = new Rect({
    width: 1920, height: 600,
    y: -240,
    fill: COLORS.skyBlue,
    opacity: 0.15,
  });

  // Sun — glow halo + bright core, starts off-screen lower-left
  const sunGlow = new Circle({
    width: 220, height: 220,
    fill: "#ffdd88",
    opacity: 0.28,
    x: -700, y: 380,
  });
  const sunCore = new Circle({
    width: 110, height: 110,
    fill: "#fff9e6",
    opacity: 0.95,
    x: -700, y: 380,
  });

  const question = new Txt({
    text: "Why is the sky blue?",
    fontSize: 80,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });

  view.add(bg);
  view.add(skyTint);
  view.add(sunGlow);
  view.add(sunCore);
  view.add(question);

  // Sun rises while question fades in (~2s)
  yield* all(
    sunGlow.x(-180, 2, easeOutCubic),
    sunGlow.y(200,  2, easeOutCubic),
    sunCore.x(-180, 2, easeOutCubic),
    sunCore.y(200,  2, easeOutCubic),
    question.opacity(1, 1.2, easeInOutCubic),
  );

  yield* waitFor(2.2); // hold on question

  yield* question.opacity(0, 0.6, easeInOutCubic); // ~5s total
});
