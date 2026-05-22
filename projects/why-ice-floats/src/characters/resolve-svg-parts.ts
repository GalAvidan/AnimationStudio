import type { Node } from "@motion-canvas/2d";
import type { SVG } from "@motion-canvas/2d";

/**
 * Resolve named SVG elements into Motion Canvas Node references using
 * SVG.getChildrenById() (public API in MC 3.17.x).
 *
 * MC's SVG parser flattens all <g> groups — every leaf shape is reachable by
 * id regardless of nesting depth. Throws clearly if an id is not found.
 */
export function resolveSvgParts(svg: SVG, ids: string[]): Record<string, Node> {
  const parts: Record<string, Node> = {};
  for (const id of ids) {
    const found = svg.getChildrenById(id);
    if (found.length === 0) {
      throw new Error(
        `resolveSvgParts: element "${id}" not found in SVG. ` +
          `Ensure curious.svg has a leaf shape element with id="${id}" ` +
          `(not a <g> group — MC dissolves groups during parsing).`,
      );
    }
    parts[id] = found[0];
  }
  return parts;
}
