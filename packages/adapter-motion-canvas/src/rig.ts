import type { Node } from "@motion-canvas/2d";
import {
  all,
  easeInOutCubic,
  type ThreadGenerator,
  type TimingFunction,
  type Vector2,
} from "@motion-canvas/core";

/**
 * A named map of Motion Canvas nodes that make up a character or scene element.
 *
 * The caller is responsible for building the nodes (whether from an `<SVG>`
 * node's parsed children or hand-authored `Rect`/`Circle`/`Path` primitives)
 * and providing them under stable names. The recommended naming vocabulary
 * lives in `agent-context/skills/core/svg-layer-naming.skill.md`.
 */
export type RigParts = Record<string, Node>;

/**
 * A single pose: a partial map from part name to the visual properties that
 * should change. Properties not listed are left untouched.
 *
 * `swap` cross-fades this part out while fading the named sibling in (intended
 * for mouth shapes / expression layers in the same slot).
 */
export interface PoseProps {
  opacity?: number;
  scale?: number | [number, number];
  x?: number;
  y?: number;
  rotation?: number;
  swap?: string;
}

export type Pose = Record<string, PoseProps>;

export interface RigOptions {
  parts: RigParts;
  /** Named poses (e.g. `neutral`, `happy`, `worried`) reusable via `applyPreset`. */
  presets?: Record<string, Pose>;
  /** Applied immediately (no tween) at construction. */
  initialPreset?: string;
}

/**
 * Minimal character / scene-element rig for Motion Canvas.
 *
 * Scope (intentional):
 *  - No IK, no walk cycle, no lip-sync.
 *  - No SVG parsing — the caller hands in pre-built nodes.
 *  - No automatic emotion → preset mapping — the scene author calls
 *    `applyPreset(beat.emotion ?? 'neutral')` explicitly.
 *
 * See `agent-context/skills/adapters/motion-canvas/character-rig.skill.md` for
 * a worked example.
 */
export class Rig {
  readonly parts: RigParts;
  readonly presets: Record<string, Pose>;
  private readonly baselineX = new Map<string, number>();
  private readonly baselineY = new Map<string, number>();

  constructor(opts: RigOptions) {
    this.parts = opts.parts;
    this.presets = opts.presets ?? {};
    for (const [name, node] of Object.entries(this.parts)) {
      const p = node.position() as Vector2;
      this.baselineX.set(name, p.x);
      this.baselineY.set(name, p.y);
    }
    if (opts.initialPreset) {
      const pose = this.presets[opts.initialPreset];
      if (pose) this.applyPoseImmediate(pose);
    }
  }

  /** Lookup a part; throws when the name is unknown so typos fail loudly. */
  layer(name: string): Node {
    const node = this.parts[name];
    if (!node) {
      throw new Error(
        `Rig: unknown part "${name}". Known parts: ${Object.keys(this.parts).join(", ")}`,
      );
    }
    return node;
  }

  /** Tween toward the given pose. Yields nothing if pose touches no known parts. */
  *pose(
    pose: Pose,
    duration = 0.3,
    easing: TimingFunction = easeInOutCubic,
  ): ThreadGenerator {
    const tweens: ThreadGenerator[] = [];
    for (const [partName, props] of Object.entries(pose)) {
      const node = this.parts[partName];
      if (!node) continue;
      this.collectTweens(node, partName, props, duration, easing, tweens);
    }
    if (tweens.length === 0) return;
    yield* all(...tweens);
  }

  /** Tween toward a named preset; errors on unknown name. */
  *applyPreset(name: string, duration = 0.3): ThreadGenerator {
    const pose = this.presets[name];
    if (!pose) {
      throw new Error(
        `Rig: unknown preset "${name}". Known presets: ${
          Object.keys(this.presets).join(", ") || "(none)"
        }`,
      );
    }
    yield* this.pose(pose, duration);
  }

  /**
   * Quick eye-blink. Closes parts whose name starts with `eye_` by scaling
   * their height to ~10%, then restores. Silently does nothing if no such
   * parts exist.
   */
  *blink(duration = 0.15): ThreadGenerator {
    const eyes = Object.entries(this.parts).filter(([n]) => n.startsWith("eye_"));
    if (eyes.length === 0) return;
    const half = duration / 2;
    yield* all(...eyes.map(([, node]) => node.scale([1, 0.1], half, easeInOutCubic)));
    yield* all(...eyes.map(([, node]) => node.scale([1, 1], half, easeInOutCubic)));
  }

  /**
   * Offset eye parts toward `point` (a stage-space coordinate). The shift is a
   * small fraction of the distance — enough to read as "looking at" without a
   * full pupil-tracking model.
   */
  *lookAt(point: Vector2 | [number, number], duration = 0.3): ThreadGenerator {
    const [tx, ty] = Array.isArray(point) ? point : [point.x, point.y];
    const eyes = Object.entries(this.parts).filter(([n]) => n.startsWith("eye_"));
    if (eyes.length === 0) return;
    const tweens: ThreadGenerator[] = [];
    for (const [name, node] of eyes) {
      const bx = this.baselineX.get(name) ?? 0;
      const by = this.baselineY.get(name) ?? 0;
      // 6% drift toward target, capped so eyes never leave their sockets.
      const dx = clamp((tx - bx) * 0.06, -18, 18);
      const dy = clamp((ty - by) * 0.06, -12, 12);
      tweens.push(node.position([bx + dx, by + dy], duration, easeInOutCubic));
    }
    yield* all(...tweens);
  }

  /**
   * Cross-fade the visible variant within a slot. All parts whose name starts
   * with `${slot}_` are made invisible except `partName`, which fades in.
   *
   * Example: parts `mouth_smile`, `mouth_frown`, `mouth_o` and
   *   `swapTo('mouth', 'mouth_smile')` → smile in, others out.
   */
  *swapTo(slot: string, partName: string, duration = 0.2): ThreadGenerator {
    const target = this.parts[partName];
    if (!target) {
      throw new Error(`Rig: swapTo target "${partName}" not found`);
    }
    const prefix = `${slot}_`;
    const siblings = Object.entries(this.parts).filter(
      ([n]) => n.startsWith(prefix) && n !== partName,
    );
    const tweens: ThreadGenerator[] = [target.opacity(1, duration, easeInOutCubic)];
    for (const [, node] of siblings) {
      tweens.push(node.opacity(0, duration, easeInOutCubic));
    }
    yield* all(...tweens);
  }

  // ---- internals ----

  private collectTweens(
    node: Node,
    partName: string,
    props: PoseProps,
    duration: number,
    easing: TimingFunction,
    out: ThreadGenerator[],
  ): void {
    if (props.opacity !== undefined) {
      out.push(node.opacity(props.opacity, duration, easing));
    }
    if (props.scale !== undefined) {
      const s: [number, number] =
        typeof props.scale === "number" ? [props.scale, props.scale] : props.scale;
      out.push(node.scale(s, duration, easing));
    }
    if (props.rotation !== undefined) {
      out.push(node.rotation(props.rotation, duration, easing));
    }
    if (props.x !== undefined || props.y !== undefined) {
      const cur = node.position() as Vector2;
      const bx = this.baselineX.get(partName) ?? cur.x;
      const by = this.baselineY.get(partName) ?? cur.y;
      const tx = props.x !== undefined ? bx + props.x : cur.x;
      const ty = props.y !== undefined ? by + props.y : cur.y;
      out.push(node.position([tx, ty], duration, easing));
    }
    if (props.swap !== undefined) {
      const target = this.parts[props.swap];
      if (target) {
        out.push(node.opacity(0, duration, easing));
        out.push(target.opacity(1, duration, easing));
      }
    }
  }

  private applyPoseImmediate(pose: Pose): void {
    for (const [partName, props] of Object.entries(pose)) {
      const node = this.parts[partName];
      if (!node) continue;
      if (props.opacity !== undefined) node.opacity(props.opacity);
      if (props.scale !== undefined) {
        const s: [number, number] =
          typeof props.scale === "number" ? [props.scale, props.scale] : props.scale;
        node.scale(s);
      }
      if (props.rotation !== undefined) node.rotation(props.rotation);
      if (props.x !== undefined || props.y !== undefined) {
        const bx = this.baselineX.get(partName) ?? 0;
        const by = this.baselineY.get(partName) ?? 0;
        node.position([
          props.x !== undefined ? bx + props.x : bx,
          props.y !== undefined ? by + props.y : by,
        ]);
      }
      if (props.swap !== undefined) {
        const target = this.parts[props.swap];
        if (target) {
          node.opacity(0);
          target.opacity(1);
        }
      }
    }
  }
}

/**
 * Factory: build a `Rig` from a parts map and optional preset library.
 *
 * The name `loadRig` reflects the *intent* (a rig with pose presets is being
 * loaded for the scene) rather than the mechanism — there is no SVG parsing
 * inside. The caller assembles `parts` from whatever source (an `<SVG>` node's
 * children, primitive shapes, imported components, …).
 */
export function loadRig(opts: RigOptions): Rig {
  return new Rig(opts);
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
