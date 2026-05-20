import { Circle, Layout, Rect } from "@motion-canvas/2d";
import type { Node } from "@motion-canvas/2d";
import type { BuiltCharacter } from "./hero";

export function buildFriend(opts: { x: number; y?: number }): BuiltCharacter {
  const head = new Circle({ size: 280, fill: "#cfe8d4", stroke: "#1f3a2a", lineWidth: 6 });

  const brow_left  = new Rect({ x: -55, y: -70, width: 50, height: 8, fill: "#1f3a2a" });
  const brow_right = new Rect({ x:  55, y: -70, width: 50, height: 8, fill: "#1f3a2a" });

  const eye_left  = new Circle({ x: -50, y: -30, size: 28, fill: "#222" });
  const eye_right = new Circle({ x:  50, y: -30, size: 28, fill: "#222" });

  const mouth_neutral = new Rect({ y: 60, width: 80, height: 8,  fill: "#1f3a2a", opacity: 1 });
  const mouth_smile   = new Rect({ y: 60, width: 80, height: 28, fill: "#2a7a4a", opacity: 0, radius: 14 });
  const mouth_frown   = new Rect({ y: 70, width: 80, height: 20, fill: "#553",    opacity: 0, radius: 10 });

  const root = new Layout({
    x: opts.x,
    y: opts.y ?? 0,
    children: [head, brow_left, brow_right, eye_left, eye_right, mouth_neutral, mouth_smile, mouth_frown],
  });

  return {
    root,
    parts: { head, brow_left, brow_right, eye_left, eye_right, mouth_neutral, mouth_smile, mouth_frown },
  };
}
