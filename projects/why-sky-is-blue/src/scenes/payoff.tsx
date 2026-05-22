import { makeScene2D, Rect, Circle, Line, Txt } from "@motion-canvas/2d";
import { all, sequence, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";

// Beat 7 — Payoff (~7s)
// Wide blue sky. Scattered blue rays converge from every direction onto a
// silhouetted observer at the base of the frame.
// Closing line fades in: "The sky is blue because blue light can't stop bouncing."

// Observer position (center-bottom of sky)
const OBS: [number, number] = [0, 295];

// Ray source points spread across all edges of the frame
const RAY_SOURCES: [number, number][] = [
  // top edge
  [-860, -540], [-430, -540], [0, -540], [430, -540], [860, -540],
  // left edge
  [-960, -200], [-960,  80],
  // right edge
  [ 960, -200], [ 960,  80],
  // upper corners / diagonals
  [-960, -400], [960, -400],
  [-960,  -10], [960,  -10],
];

export default makeScene2D(function* (view) {
  // Sky blue background
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.skyBlue });

  // Slightly deeper blue at top
  const skyDeep = new Rect({
    width: 1920, height: 400,
    y: -340,
    fill: "#2968b8",
    opacity: 0.45,
  });

  // Ground strip at the bottom
  const ground = new Rect({
    width: 1920, height: 140,
    y: 470,
    fill: "#141407",
  });

  // Converging rays (atmosphere blue, translucent)
  const rays = RAY_SOURCES.map(src =>
    new Line({
      points: [src, OBS],
      stroke: "#b8d4f0",
      lineWidth: 2.5,
      opacity: 0.65,
      end: 0,
    })
  );

  // Observer silhouette
  const observerBody = new Rect({
    width: 14, height: 80,
    fill: COLORS.bg,
    x: OBS[0],
    y: 295,
    opacity: 0,
  });
  const observerHead = new Circle({
    width: 22, height: 22,
    fill: COLORS.bg,
    x: OBS[0],
    y: 244,
    opacity: 0,
  });

  // Payoff line
  const payoff = new Txt({
    text: "The sky is blue because\nblue light can't stop bouncing.",
    fontSize: 56,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -170,
  });

  view.add(bg);
  view.add(skyDeep);
  view.add(ground);
  rays.forEach(r => view.add(r));
  view.add(observerBody);
  view.add(observerHead);
  view.add(payoff);

  // Observer appears
  yield* all(
    observerBody.opacity(1, 0.7, easeOutCubic),
    observerHead.opacity(1, 0.7, easeOutCubic),
  );

  // Blue rays converge from all directions with a stagger (~2.4s)
  yield* sequence(
    0.1,
    ...rays.map(r => r.end(1, 1.2, easeOutCubic)),
  );

  // Payoff text
  yield* payoff.opacity(1, 0.8, easeInOutCubic);
  yield* waitFor(2.5);
  yield* payoff.opacity(0, 0.8, easeInOutCubic); // ~7s total
});
