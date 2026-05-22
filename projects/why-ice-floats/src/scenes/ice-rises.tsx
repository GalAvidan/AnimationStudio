import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  easeInOutCubic,
  easeOutCubic,
  waitFor,
} from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { curiousPresets } from "../../assets/curious.presets";
import { buildCurious } from "../characters/curious";
import { COLORS } from "../data/beats-general";

// Beat 3 — The strange thing (~5s)
// Unlike the rock and coin, the ice cube floats up. Character is surprised.
export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const water = new Rect({
    width: 164,
    height: 190,
    y: 85,
    fill: COLORS.water,
    opacity: 0.85,
  });
  const glassOutline = new Rect({
    width: 180,
    height: 320,
    y: 20,
    fill: null,
    stroke: COLORS.glass,
    lineWidth: 4,
    radius: 6,
  });

  // Rock and coin already at bottom (state from previous beat)
  const rock = new Circle({ size: 40, y: 160, fill: COLORS.rock });
  const coin = new Circle({ size: 22, x: 18, y: 136, fill: COLORS.coin });

  // Ice cube — starts submerged (just below water surface at y≈−10), then rises
  const ice = new Rect({
    width: 68,
    height: 68,
    y: 20,
    fill: COLORS.ice,
    stroke: COLORS.iceStroke,
    lineWidth: 2,
    radius: 6,
    opacity: 0.9,
  });

  const caption = new Txt({
    text: "So why does solid water float on liquid water?",
    fontSize: 46,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -390,
  });

  const char = buildCurious({ x: 660, y: 330, size: 200 });
  const rig = loadRig({
    parts: char.parts,
    presets: curiousPresets,
    initialPreset: "curious",
  });

  view.add(water);
  view.add(glassOutline);
  view.add(rock);
  view.add(coin);
  view.add(ice);
  view.add(caption);
  view.add(char.root);

  yield* waitFor(0.3);

  // Ice rises to the floating position (water surface ≈ y −10, ice half-height 34)
  yield* ice.y(-44, 1.0, easeOutCubic);
  // Gentle bob
  yield* ice.y(-54, 0.25, easeOutCubic);
  yield* ice.y(-44, 0.2);

  yield* waitFor(0.15);

  // Caption + character surprised simultaneously
  yield* all(
    caption.opacity(1, 0.7, easeInOutCubic),
    rig.applyPreset("surprised", 0.5),
  );

  yield* waitFor(1.8);
  yield* rig.blink();
  yield* waitFor(0.55);
});
