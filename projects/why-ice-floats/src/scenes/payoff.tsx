import { Circle, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, waitFor } from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { curiousPresets } from "../../assets/curious.presets";
import { buildCurious } from "../characters/curious";
import { COLORS } from "../data/beats-general";

// Beat 6 — Payoff (~3s)
// Lake cross-section: ice on top, cold water, deep water + fish. Mystery solved.
export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  // ── Lake layers (full-width bands) ────────────────────────────────────────
  const iceLayer = new Rect({
    width: 1920,
    height: 160,
    y: -300,
    fill: COLORS.ice,
    opacity: 0,
  });
  const waterLayer = new Rect({
    width: 1920,
    height: 280,
    y: -80,
    fill: COLORS.water,
    opacity: 0,
  });
  const deepLayer = new Rect({
    width: 1920,
    height: 360,
    y: 220,
    fill: COLORS.waterDeep,
    opacity: 0,
  });

  // ── Layer labels ──────────────────────────────────────────────────────────
  const iceLabel = new Txt({
    text: "ice",
    x: -820,
    y: -300,
    fontSize: 28,
    fill: COLORS.bg,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });
  const waterLabel = new Txt({
    text: "cold water",
    x: -820,
    y: -80,
    fontSize: 28,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });

  // ── Fish (simple) ─────────────────────────────────────────────────────────
  const fishBody = new Circle({
    width: 64,
    height: 30,
    x: 160,
    y: 270,
    fill: "#5aa0cc",
    opacity: 0,
  });
  const fishEye = new Circle({
    size: 7,
    x: 176,
    y: 264,
    fill: "#ffffff",
    opacity: 0,
  });
  // Tail: closed triangle to the right of the body
  const fishTail = new Line({
    points: [
      [192, 270],
      [216, 254],
      [216, 286],
    ],
    closed: true,
    fill: "#5aa0cc",
    lineWidth: 0,
    opacity: 0,
  });

  const deepLabel = new Txt({
    text: "life beneath",
    x: 160,
    y: 330,
    fontSize: 28,
    fill: COLORS.label,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
  });

  // ── Caption ───────────────────────────────────────────────────────────────
  const caption = new Txt({
    text: "That's why lakes freeze from the top down.",
    fontSize: 48,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 430,
  });

  // ── Character (left side, happy) ─────────────────────────────────────────
  const char = buildCurious({ x: -760, y: 330, size: 180 });
  const rig = loadRig({
    parts: char.parts,
    presets: curiousPresets,
    initialPreset: "surprised",
  });

  view.add(deepLayer);
  view.add(waterLayer);
  view.add(iceLayer);
  view.add(fishTail);
  view.add(fishBody);
  view.add(fishEye);
  view.add(iceLabel);
  view.add(waterLabel);
  view.add(deepLabel);
  view.add(caption);
  view.add(char.root);

  // Layers + character expression change simultaneously
  yield* all(
    iceLayer.opacity(1, 0.8, easeInOutCubic),
    waterLayer.opacity(0.9, 0.8, easeInOutCubic),
    deepLayer.opacity(0.85, 0.8, easeInOutCubic),
    iceLabel.opacity(1, 0.8, easeInOutCubic),
    waterLabel.opacity(1, 0.8, easeInOutCubic),
    rig.applyPreset("happy", 0.5),
  );

  // Fish + deep label appear
  yield* all(
    fishBody.opacity(1, 0.4, easeInOutCubic),
    fishEye.opacity(1, 0.4, easeInOutCubic),
    fishTail.opacity(1, 0.4, easeInOutCubic),
    deepLabel.opacity(1, 0.4, easeInOutCubic),
  );

  // Caption fades in with a blink
  yield* all(caption.opacity(1, 0.5, easeInOutCubic), rig.blink());

  yield* waitFor(1.3);
});
