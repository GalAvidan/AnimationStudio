import { makeScene2D } from "@motion-canvas/2d";
import { waitFor, all } from "@motion-canvas/core";
import { fadeTransition } from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { buildHero } from "../characters/hero";
import { buildFriend } from "../characters/friend";
import { heroPresets } from "../../assets/hero.presets";
import { friendPresets } from "../../assets/friend.presets";

/**
 * Scene 2 — "The Reassurance" (~8s)
 *
 * Opens with [TRANSITION: fade 400ms] from scene 1.
 *
 * Beats:
 *  1. (0.0–3.0s) Friend smiles, speaks.    [SPEAKER: friend, EMOTION: happy]
 *  2. (3.0–6.0s) Hero relaxes, smiles too. [SPEAKER: hero,   EMOTION: happy]
 *  3. (6.0–8.0s) Both blink, settle.
 */
export default makeScene2D(function* (view) {
  yield* fadeTransition(0.4);

  view.fill("#11161c");

  const heroBuilt   = buildHero({ x: -350 });
  const friendBuilt = buildFriend({ x: 350 });
  view.add(heroBuilt.root);
  view.add(friendBuilt.root);

  const hero   = loadRig({ parts: heroBuilt.parts,   presets: heroPresets,   initialPreset: "worried" });
  const friend = loadRig({ parts: friendBuilt.parts, presets: friendPresets, initialPreset: "neutral" });

  // Beat 1: friend reassures.
  yield* all(
    friend.applyPreset("happy", 0.4),
    friend.lookAt([-350, 0], 0.3),
  );
  yield* waitFor(2.4);

  // Beat 2: hero releases tension, smiles.
  yield* all(
    hero.applyPreset("happy", 0.5),
    hero.lookAt([350, 0], 0.3),
  );
  yield* waitFor(2.4);

  // Beat 3: shared blink → settle.
  yield* all(hero.blink(), friend.blink());
  yield* waitFor(1.4);
});
