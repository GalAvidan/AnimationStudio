import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  easeInCubic,
  easeInOutCubic,
  easeOutBack,
  waitFor,
} from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { curiousPresets } from "../../assets/curious.presets";
import { buildCurious } from "../characters/curious";
import { COLORS } from "../data/beats-general";

// Beat 1 — Hook (~5s)
// An ice cube drops into a glass of water and floats. Character watches neutrally.
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
  const ice = new Rect({
    width: 68,
    height: 68,
    y: -560,
    fill: COLORS.ice,
    stroke: COLORS.iceStroke,
    lineWidth: 2,
    radius: 6,
    opacity: 0.9,
  });
  const question = new Txt({
    text: "Why does ice float?",
    fontSize: 68,
    fill: COLORS.text,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: -390,
  });

  const char = buildCurious({ x: 660, y: 330, size: 200 });
  const rig = loadRig({
    parts: char.parts,
    presets: curiousPresets,
    initialPreset: "neutral",
  });

  view.add(water);
  view.add(glassOutline);
  view.add(ice);
  view.add(question);
  view.add(char.root);

  // Ice drops into the water (gravity)
  yield* ice.y(-44, 1.2, easeInCubic);
  // Buoyancy: short bob upward then settle
  yield* ice.y(-60, 0.3, easeOutBack);
  yield* ice.y(-44, 0.25);

  yield* waitFor(0.2);

  // Question fades in; character blinks
  yield* all(question.opacity(1, 0.8, easeInOutCubic), rig.blink());

  yield* waitFor(2.0);
  yield* question.opacity(0, 0.45, easeInOutCubic);
});
