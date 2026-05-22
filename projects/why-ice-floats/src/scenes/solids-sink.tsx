import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  all,
  easeInCubic,
  easeInOutCubic,
  waitFor,
} from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { curiousPresets } from "../../assets/curious.presets";
import { buildCurious } from "../characters/curious";
import { COLORS } from "../data/beats-general";

// Beat 2 — Contrast (~5s)
// A rock and a coin drop into the glass and sink. Character goes curious.
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

  // Rock (gray circle)
  const rock = new Circle({ size: 40, y: -420, fill: COLORS.rock });
  // Coin (gold, smaller, offset slightly right)
  const coin = new Circle({ size: 22, x: 18, y: -420, fill: COLORS.coin });

  const caption = new Txt({
    text: "A rock. A coin. They sink.",
    fontSize: 54,
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
  view.add(rock);
  view.add(coin);
  view.add(caption);
  view.add(char.root);

  // Rock sinks to bottom (glass bottom ≈ y 180, rock center = 160)
  yield* rock.y(160, 1.2, easeInCubic);
  yield* waitFor(0.15);

  // Coin sinks (lands slightly above rock)
  yield* coin.y(136, 0.9, easeInCubic);
  yield* waitFor(0.1);

  // Caption fades in + character goes curious simultaneously
  yield* all(
    caption.opacity(1, 0.6, easeInOutCubic),
    rig.applyPreset("curious", 0.5),
  );

  yield* waitFor(1.3);
  yield* rig.blink();
  yield* waitFor(0.75);
});
