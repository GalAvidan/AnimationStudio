import { Layout, SVG } from "@motion-canvas/2d";
import type { Node } from "@motion-canvas/2d";
import { resolveSvgParts } from "./resolve-svg-parts";
import curiousSvg from "../../assets/curious.svg?raw";

const PART_IDS = [
  "head",
  "eye_left",
  "eye_right",
  "brow_left",
  "brow_right",
  "mouth_neutral",
  "mouth_surprised",
  "mouth_smile",
] as const;

export interface BuiltCharacter {
  root: Layout;
  parts: Record<string, Node>;
}

export function buildCurious(opts: {
  x?: number;
  y?: number;
  size?: number;
}): BuiltCharacter {
  const svgNode = new SVG({ svg: curiousSvg, size: opts.size ?? 240 });
  const root = new Layout({
    x: opts.x ?? 0,
    y: opts.y ?? 0,
    children: [svgNode],
  });
  const parts = resolveSvgParts(svgNode, [...PART_IDS]);
  return { root, parts };
}
