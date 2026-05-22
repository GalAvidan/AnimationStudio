import { makeScene2D, Rect, Circle, Line, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, SPECTRUM } from "../data/beats-general";

// Beat 5 — Why not violet? (~8s)
// Spectrum bands appear. Eye sensitivity curve overlays them.
// Blue band glows; violet band dims to show why blue wins.

const BAND_W   = 240;
const BAND_H   = 280;
const BAND_Y   =  80;

// Band x positions: centered, 6 bands
const bandXFor = (i: number) => (i - 2.5) * BAND_W;

// Eye sensitivity curve — bell shape centered on blue (index 4 → x ≈ 360)
// Points are in scene coordinates; curve peaks at blue band
const CURVE_PTS: [number, number][] = [
  [-700,  130], [-580,  90], [-460,  30], [-340, -30],
  [-220, -70],  [-100, -60], [  20,  10], [ 140,  80],
  [ 260, 120],  [ 360, -80], // peak at blue
  [ 480,  60],  [ 600,  90], [ 700,  70],
];

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });

  // Spectrum bands
  const bands = SPECTRUM.map((s, i) =>
    new Rect({
      width: BAND_W - 6,
      height: BAND_H,
      fill: s.color,
      x: bandXFor(i),
      y: BAND_Y,
      opacity: 0,
    })
  );

  // Band labels
  const bandLabels = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet"].map(
    (name, i) =>
      new Txt({
        text: name,
        fontSize: 26,
        fill: COLORS.white,
        fontFamily: "Inter, system-ui, sans-serif",
        x: bandXFor(i),
        y: BAND_Y + BAND_H / 2 + 30,
        opacity: 0,
      })
  );

  // Sensitivity curve
  const curve = new Line({
    points: CURVE_PTS,
    stroke: COLORS.white,
    lineWidth: 4,
    end: 0,
    opacity: 0.9,
  });

  // Blue highlight ring
  const blueHighlight = new Circle({
    width: 90, height: 90,
    fill: COLORS.blue,
    x: bandXFor(4),
    y: -80,
    opacity: 0,
  });

  // Stage 1 caption — appears with the spectrum bands
  const setupCaption = new Txt({
    text: "Violet actually scatters even more than blue.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  // Stage 2 caption — appears when violet dims
  const cueLabel = new Txt({
    text: "Our eyes are simply better tuned for blue.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  view.add(bg);
  bands.forEach(b => view.add(b));
  bandLabels.forEach(l => view.add(l));
  view.add(curve);
  view.add(blueHighlight);
  view.add(setupCaption);
  view.add(cueLabel);

  // Bands fade in; stage 1 caption appears simultaneously
  yield* all(
    setupCaption.opacity(1, 0.8, easeInOutCubic),
    ...bands.map(b => b.opacity(1, 1.4, easeInOutCubic)),
  );
  yield* all(...bandLabels.map(l => l.opacity(0.8, 0.6)));
  yield* waitFor(0.4);

  // Sensitivity curve draws in
  yield* curve.end(1, 1.5, easeOutCubic);
  yield* waitFor(0.4);

  // Violet dims; blue highlighted; captions swap
  const blueBand   = bands[4];
  const violetBand = bands[5];
  yield* all(
    violetBand.opacity(0.22, 1.2, easeInOutCubic),
    blueBand.opacity(1, 0.4),
    blueHighlight.opacity(0.45, 0.8, easeInOutCubic),
    setupCaption.opacity(0, 0.6, easeInOutCubic),
    cueLabel.opacity(1, 0.8, easeInOutCubic),
  );

  yield* waitFor(1.5);

  // Fade out
  yield* all(
    ...bands.map(b => b.opacity(0, 0.6)),
    ...bandLabels.map(l => l.opacity(0, 0.6)),
    curve.opacity(0, 0.6),
    blueHighlight.opacity(0, 0.6),
    setupCaption.opacity(0, 0.4),
    cueLabel.opacity(0, 0.6),
  ); // ~8s total
});
