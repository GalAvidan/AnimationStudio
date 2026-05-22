import { makeScene2D, Rect, Circle, Line, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, SYNC } from "../data/beats-general";

// Beat 4 — Rayleigh scattering (~12s)
// Molecule sits at center. Four colored rays approach from the left.
// Red, orange, yellow pass straight through.
// Blue presses against the molecule; at SYNC.scatterBounce (8s) it bursts outward.

// Incoming rays: [color, fromPoint, toPoint]
// red/orange/yellow extend to the right; blue stops at molecule (0,0)
const INCOMING: [string, [number, number], [number, number]][] = [
  [COLORS.red,    [-920, -75], [ 920,  75]],
  [COLORS.orange, [-920, -25], [ 920,  25]],
  [COLORS.yellow, [-920,  25], [ 920, -25]],
  [COLORS.blue,   [-920,  75], [   0,   0]],
];

// Scatter burst: 8 rays from molecule outward (45° apart)
const SCATTER_ENDS: [number, number][] = [
  [ 340,    0],
  [ 240, -240],
  [   0, -340],
  [-240, -240],
  [-340,    0],
  [-240,  240],
  [   0,  340],
  [ 240,  240],
];

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });

  // Molecule
  const moleculeGlow = new Circle({
    width: 62, height: 62,
    fill: COLORS.molecule,
    opacity: 0,
  });
  const molecule = new Circle({
    width: 28, height: 28,
    fill: COLORS.molecule,
    opacity: 0,
  });

  // Incoming rays
  const incomingLines = INCOMING.map(([color, from, to]) =>
    new Line({
      points: [from, to],
      stroke: color,
      lineWidth: color === COLORS.blue ? 5 : 3,
      end: 0,
    })
  );

  // Scatter burst rays (pre-created, invisible until sync)
  const scatterRays = SCATTER_ENDS.map(end =>
    new Line({
      points: [[0, 0], end],
      stroke: COLORS.blue,
      lineWidth: 4,
      end: 0,
      opacity: 0,
    })
  );

  // Zone label — identifies the molecule at the scene centre
  const moleculeLabel = new Txt({
    text: "Single molecule",
    fontSize: 30,
    fill: COLORS.atmosphere,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: 85, y: -58,
  });

  // Stage 1 caption — appears with the incoming rays
  const setupCaption = new Txt({
    text: "Shorter wavelengths scatter in every direction.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  // Stage 2 caption — appears at the scatter-bounce sync point
  const caption = new Txt({
    text: "Blue bounces · Red passes through",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  view.add(bg);
  view.add(moleculeGlow);
  view.add(molecule);
  incomingLines.forEach(l => view.add(l));
  scatterRays.forEach(r => view.add(r));
  view.add(moleculeLabel);
  view.add(setupCaption);
  view.add(caption);

  // Phase 1 (0–2s): molecule appears, all rays draw in; zone label + stage 1 caption appear
  yield* all(
    molecule.opacity(1, 0.6),
    moleculeGlow.opacity(0.18, 0.6),
    moleculeLabel.opacity(0.85, 0.6, easeInOutCubic),
    setupCaption.opacity(1, 0.6, easeInOutCubic),
    ...incomingLines.map(l => l.end(1, 2, easeOutCubic)),
  );

  // Phase 2 (2–3s): red/orange/yellow are now across the screen; blue is at molecule
  yield* waitFor(1);

  // Phase 3 (3–7s): molecule glow builds — blue light pressing in
  yield* moleculeGlow.opacity(0.45, 1.5, easeInOutCubic);
  yield* waitFor(2.5);

  // Pre-burst build-up (7–8s)
  yield* moleculeGlow.opacity(0.8, 1, easeInOutCubic);

  // SYNC: scatter-bounce at 8s; setupCaption fades out as scatter burst fires
  yield* all(
    moleculeGlow.opacity(0, 0.15),
    incomingLines[3].opacity(0, 0.25), // blue incoming disappears
    setupCaption.opacity(0, 0.4, easeInOutCubic),
    ...scatterRays.map(r => r.opacity(1, 0.1)),
    ...scatterRays.map(r => r.end(1, 0.5, easeOutCubic)),
  );

  // Caption fades in
  yield* caption.opacity(1, 0.5, easeInOutCubic);
  yield* waitFor(2.5);

  // Fade out everything
  yield* all(
    caption.opacity(0, 0.5),
    setupCaption.opacity(0, 0.3),
    moleculeLabel.opacity(0, 0.5),
    molecule.opacity(0, 0.5),
    ...incomingLines.map(l => l.opacity(0, 0.5)),
    ...scatterRays.map(r => r.opacity(0, 0.5)),
  ); // ~12s total
});
