import { makeScene2D, Rect, Circle, Line, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, SYNC } from "../data/beats-general";

// Beat 6 — Sunrise / sunset (~8s)
// Sun sits at the left horizon. At SYNC.longPath (3s), a long shallow path
// traces from sun toward the observer on the right. Blue depletes along the
// path — only warm orange/red reaches the observer.

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: "#1a0a05" }); // warm dark bg

  // Warm horizon glow (sunrise flush on the left)
  const horizonGlow = new Rect({
    width: 700, height: 380,
    x: -510, y: 300,
    fill: COLORS.sunset,
    opacity: 0,
  });

  // Ground below horizon
  const ground = new Rect({
    width: 1920, height: 320,
    y: 380,
    fill: "#0f0a05",
  });

  // Horizon line
  const horizon = new Line({
    points: [[-960, 220], [960, 220]],
    stroke: "#3a2210",
    lineWidth: 2,
  });

  // Sun at far-left horizon
  const sunGlow = new Circle({
    width: 210, height: 210,
    fill: COLORS.sunset,
    opacity: 0.38,
    x: -820, y: 218,
  });
  const sunCore = new Circle({
    width: 88, height: 88,
    fill: "#ffcc55",
    opacity: 0.95,
    x: -820, y: 218,
  });

  // Long atmosphere path — draws in on sync, from sun to observer
  const path = new Line({
    points: [[-820, 205], [840, 175]],
    stroke: COLORS.sunset,
    lineWidth: 6,
    end: 0,
  });

  // Blue segment near sun — shows blue scattering out, then fades
  const blueSegment = new Line({
    points: [[-820, 200], [-380, 190]],
    stroke: COLORS.blue,
    lineWidth: 4,
    end: 0,
    opacity: 0.85,
  });

  // Observer silhouette — body + head
  const observerBody = new Rect({
    width: 14, height: 80,
    fill: COLORS.white,
    x: 840, y: 175,
    opacity: 0,
  });
  const observerHead = new Circle({
    width: 22, height: 22,
    fill: COLORS.white,
    x: 840, y: 124,
    opacity: 0,
  });

  // Zone label — appears at the long-path sync point, labels the path line
  const pathLabel = new Txt({
    text: "← longer path through atmosphere",
    fontSize: 30,
    fill: COLORS.atmosphere,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: 0, y: 155,
  });

  // Stage 1 caption — appears at beat start, contextualises the scene
  const setupCaption = new Txt({
    text: "At sunrise and sunset, light travels a much longer path.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  // Stage 2 caption — appears after blue depletes
  const caption = new Txt({
    text: "Blue has already scattered away.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  view.add(bg);
  view.add(horizonGlow);
  view.add(ground);
  view.add(horizon);
  view.add(path);
  view.add(blueSegment);
  view.add(sunGlow);
  view.add(sunCore);
  view.add(observerBody);
  view.add(observerHead);
  view.add(pathLabel);
  view.add(setupCaption);
  view.add(caption);

  // Scene establishes — horizon glow and observer appear (0–3s → SYNC.longPath)
  // Stage 1 caption appears concurrently
  yield* all(
    horizonGlow.opacity(0.4, 1.5, easeInOutCubic),
    observerBody.opacity(1, 1, easeOutCubic),
    observerHead.opacity(1, 1, easeOutCubic),
    setupCaption.opacity(1, 0.6, easeInOutCubic),
  );
  yield* waitFor(SYNC.longPath - 1.5); // = 1.5s

  // SYNC: long-path — path draws from sun to observer; zone label appears
  yield* all(
    path.end(1, 2, easeOutCubic),
    blueSegment.end(1, 0.6, easeOutCubic),
    pathLabel.opacity(0.85, 0.6, easeInOutCubic),
  );

  // Blue depletes; setupCaption swaps out as stage 2 caption appears
  yield* all(
    blueSegment.opacity(0, 1, easeInOutCubic),
    setupCaption.opacity(0, 0.6, easeInOutCubic),
  );

  yield* caption.opacity(1, 0.6, easeInOutCubic);
  yield* waitFor(0.6);

  // Fade out
  yield* all(
    caption.opacity(0, 0.7),
    setupCaption.opacity(0, 0.5),
    pathLabel.opacity(0, 0.7),
    path.opacity(0, 0.7),
    horizonGlow.opacity(0, 0.7),
    observerBody.opacity(0, 0.7),
    observerHead.opacity(0, 0.7),
  ); // ~8s total
});
