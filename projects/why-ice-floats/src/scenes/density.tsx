import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutBack, waitFor } from "@motion-canvas/core";
import { COLORS, SYNC } from "../data/beats-general";

// Beat 5 — Density (~5s)
// Side-by-side blocks. Same mass. The ice block expands then floats — less dense.
export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const BW = 180;
  const BH = 200;

  // Water block (left)
  const waterBlock = new Rect({
    width: BW,
    height: BH,
    x: -220,
    y: 0,
    fill: COLORS.water,
    radius: 6,
    opacity: 0,
  });
  const waterLabel = new Txt({
    text: "Water",
    x: -220,
    y: BH / 2 + 32,
    fontSize: 36,
    fill: COLORS.label,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });

  // Ice block (right) — same size as water block initially
  const iceBlock = new Rect({
    width: BW,
    height: BH,
    x: 220,
    y: 0,
    fill: COLORS.ice,
    stroke: COLORS.iceStroke,
    lineWidth: 2,
    radius: 6,
    opacity: 0,
  });
  const iceLabel = new Txt({
    text: "Ice",
    x: 220,
    y: BH / 2 + 32,
    fontSize: 36,
    fill: COLORS.label,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });

  // "same mass" indicator between blocks
  const massNote = new Txt({
    text: "same mass",
    x: 0,
    y: 60,
    fontSize: 28,
    fill: COLORS.label,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });

  const caption = new Txt({
    text: "Same molecules.  More space.  Less dense.",
    fontSize: 48,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -390,
  });

  view.add(waterBlock);
  view.add(waterLabel);
  view.add(iceBlock);
  view.add(iceLabel);
  view.add(massNote);
  view.add(caption);

  // Blocks fade in (~0.6s)
  yield* all(
    waterBlock.opacity(1, 0.6, easeInOutCubic),
    waterLabel.opacity(1, 0.6, easeInOutCubic),
    iceBlock.opacity(1, 0.6, easeInOutCubic),
    iceLabel.opacity(1, 0.6, easeInOutCubic),
    massNote.opacity(1, 0.6, easeInOutCubic),
    caption.opacity(1, 0.6, easeInOutCubic),
  );

  // Wait until density-reveal sync point (2s from beat start)
  yield* waitFor(SYNC.densityReveal - 0.6);

  // Ice block grows — same mass, more volume → less dense
  yield* all(
    iceBlock.width(BW * 1.22, 1.0, easeInOutCubic),
    iceBlock.height(BH * 1.22, 1.0, easeInOutCubic),
  );

  // Ice block floats up
  yield* iceBlock.y(-40, 0.9, easeOutBack);

  yield* waitFor(1.0);
});
