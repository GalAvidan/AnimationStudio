import { makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { waitFor, all } from "@motion-canvas/core";
import { loadRig } from "@studio/adapter-motion-canvas/rig";
import { buildHero } from "../characters/hero";
import { buildFriend } from "../characters/friend";
import { heroPresets } from "../../assets/hero.presets";
import { friendPresets } from "../../assets/friend.presets";

/**
 * Scene 1 — "The Question" (~7s)
 *
 * Beats:
 *  1. (0.0–2.0s) Hero on stage, neutral.                 [SPEAKER: narrator] setup
 *  2. (2.0–4.5s) Hero turns worried, looks at friend.    [SPEAKER: hero, EMOTION: worried]
 *  3. (4.5–7.0s) Friend appears, looks back, listening.  [SPEAKER: friend, EMOTION: neutral]
 *
 * The script's [SYNC: hero-question] sync point lands at ~2.0s when the
 * `worried` preset is applied (the line "Why is everything so quiet?").
 */
export default makeScene2D(function* (view) {
  view.fill("#11161c");

  const heroBuilt   = buildHero({ x: -350 });
  const friendBuilt = buildFriend({ x: 350 });
  view.add(heroBuilt.root);
  view.add(friendBuilt.root);

  const hero   = loadRig({ parts: heroBuilt.parts,   presets: heroPresets,   initialPreset: "neutral" });
  const friend = loadRig({ parts: friendBuilt.parts, presets: friendPresets, initialPreset: "neutral" });

  // Friend starts off-screen-faded.
  friendBuilt.root.opacity(0);

  // Beat 1: neutral hero, idle blink.
  yield* waitFor(1.2);
  yield* hero.blink();
  yield* waitFor(0.6);

  // Beat 2: SYNC point — hero question.
  yield* all(
    hero.applyPreset("worried", 0.4),
    hero.lookAt([350, 0], 0.4),
  );
  yield* waitFor(2.0);

  // Beat 3: friend fades in, looks back.
  yield* friendBuilt.root.opacity(1, 0.4);
  yield* friend.lookAt([-350, 0], 0.3);
  yield* waitFor(2.0);
});
