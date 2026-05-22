import { Circle, Line, makeScene2D, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, LATTICE_POS, LIQUID_POS, SYNC } from "../data/beats-general";

// Beat 4 — Hex lattice (~7s)
// Seven molecules scattered in liquid. At the lattice-form sync point (3s in)
// they snap into a hexagonal cage and bond lines appear.
export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  // Molecules start at liquid (scattered) positions
  const mols = LIQUID_POS.map(
    ([x, y]) =>
      new Circle({
        size: 32,
        x,
        y,
        fill: COLORS.molecule,
        stroke: COLORS.molBond,
        lineWidth: 3,
        opacity: 0,
      }),
  );

  // Bond lines: center → each of the 6 outer lattice nodes (hidden initially)
  const bonds = LATTICE_POS.slice(1).map(
    ([x, y]) =>
      new Line({
        points: [
          [0, 0],
          [x, y],
        ],
        stroke: COLORS.molBond,
        lineWidth: 3,
        opacity: 0,
      }),
  );

  const caption1 = new Txt({
    text: "Water molecules lock into a hexagonal cage when they freeze…",
    fontSize: 44,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -390,
    textWrap: true,
    width: 1400,
  });
  const caption2 = new Txt({
    text: "…spreading them farther apart.",
    fontSize: 44,
    fill: COLORS.label,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -390,
  });

  bonds.forEach(b => view.add(b));
  mols.forEach(m => view.add(m));
  view.add(caption1);
  view.add(caption2);

  // Molecules fade in at liquid positions (~0.8s)
  yield* all(
    ...mols.map(m => m.opacity(1, 0.8, easeInOutCubic)),
    caption1.opacity(1, 0.5, easeInOutCubic),
  );

  // Wait until the lattice-form sync point (3s from beat start)
  yield* waitFor(SYNC.latticeForm - 0.8);

  // Snap to hex lattice
  yield* all(
    ...mols.map((m, i) =>
      m.position(LATTICE_POS[i], 1.5, easeInOutCubic),
    ),
    caption1.opacity(0, 0.5, easeInOutCubic),
    caption2.opacity(1, 0.5, easeInOutCubic),
  );

  // Bond lines appear
  yield* all(...bonds.map(b => b.opacity(1, 0.8, easeInOutCubic)));

  yield* waitFor(1.7);
});
