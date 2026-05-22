import { makeScene2D, Rect, Circle, Txt } from "@motion-canvas/2d";
import { all, sequence, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS } from "../data/beats-general";

// Beat 3 — The atmosphere (~7s)
// Earth appears with a clearly curved horizon at the bottom of frame.
// An atmosphere halo ring wraps around it. Molecules appear scattered
// through the visible atmosphere band between Earth and space.

// Earth geometry: large circle centred far below frame → visible top arc
// is a gentle curve spanning the full width of the frame.
// At x=0: top of arc at y = EARTH_CENTER_Y - EARTH_RADIUS = 350
// At x=±960: top of arc at y ≈ 507 → gives a visible, natural curve
const EARTH_CENTER_Y = 3350;
const EARTH_RADIUS   = 3000; // top of arc at y = 350
const ATMO_RADIUS    = 3200; // halo peeks at y = 150 at centre

// Molecules spread evenly through the visible atmosphere band (y ≈ 160–320)
const MOLECULE_POSITIONS: [number, number][] = [
  [-840, 175], [-650, 160], [-430, 185], [-220, 165], [ -50, 175],
  [ 130, 160], [ 340, 180], [ 560, 165], [ 760, 175], [ 880, 160],
  [-740, 245], [-520, 255], [-310, 240], [-100, 250], [  80, 242],
  [ 260, 255], [ 470, 240], [ 680, 250],
  [-620, 310], [-400, 320], [-180, 308], [  40, 318], [ 260, 306],
  [ 480, 318], [ 700, 308],
];

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });

  // Atmosphere glow ring — slightly larger circle peeks above Earth as a halo
  const atmoRing = new Circle({
    width: ATMO_RADIUS * 2, height: ATMO_RADIUS * 2,
    y: EARTH_CENTER_Y,
    fill: COLORS.atmosphere,
    opacity: 0,
  });

  // Earth — dark filled circle; its top arc is the curved horizon
  const earth = new Circle({
    width: EARTH_RADIUS * 2, height: EARTH_RADIUS * 2,
    y: EARTH_CENTER_Y,
    fill: "#151e2b",
    opacity: 0,
  });

  // Molecule dots scattered through the atmosphere band
  const molecules = MOLECULE_POSITIONS.map(([x, y]) =>
    new Circle({
      width: 14, height: 14,
      fill: COLORS.molecule,
      x, y,
      opacity: 0,
    })
  );

  // Zone labels
  const spaceLabel = new Txt({
    text: "Space",
    fontSize: 30,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: -790, y: -310,
  });

  const atmoLabel = new Txt({
    text: "← Atmosphere →",
    fontSize: 30,
    fill: COLORS.atmosphere,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: 0, y: 120,
  });

  const earthLabel = new Txt({
    text: "Earth",
    fontSize: 30,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: -790, y: 445,
  });

  const n2o2Label = new Txt({
    text: "N₂ · O₂",
    fontSize: 34,
    fill: COLORS.atmosphere,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: 700, y: 130,
  });

  // Narrative caption — in the space region since Earth occupies the lower half
  const caption = new Txt({
    text: "Earth's atmosphere is full of tiny gas molecules.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -390,
  });

  view.add(bg);
  view.add(atmoRing);
  view.add(earth);
  molecules.forEach(m => view.add(m));
  view.add(spaceLabel);
  view.add(atmoLabel);
  view.add(earthLabel);
  view.add(n2o2Label);
  view.add(caption);

  // Earth + atmosphere halo reveal; Space / Earth zone labels appear
  yield* all(
    earth.opacity(1, 1.5, easeInOutCubic),
    atmoRing.opacity(0.38, 1.5, easeInOutCubic),
    spaceLabel.opacity(0.5, 1.2, easeInOutCubic),
    earthLabel.opacity(0.65, 1.5, easeInOutCubic),
  );

  // Atmosphere zone label + narrative caption
  yield* all(
    atmoLabel.opacity(0.9, 0.7, easeInOutCubic),
    caption.opacity(1, 0.6, easeInOutCubic),
  );

  // Molecule dots sequence in through the atmosphere band
  yield* sequence(
    0.08,
    ...molecules.map(m => m.opacity(1, 0.4, easeOutCubic)),
  );

  yield* n2o2Label.opacity(0.7, 0.6, easeInOutCubic);
  yield* waitFor(1.2);

  // Fade out text; dim molecules for transition to next beat
  yield* all(
    n2o2Label.opacity(0, 0.6, easeInOutCubic),
    caption.opacity(0, 0.6, easeInOutCubic),
    atmoLabel.opacity(0, 0.6, easeInOutCubic),
    ...molecules.map(m => m.opacity(0.5, 0.7)),
  ); // ~7s total
});
