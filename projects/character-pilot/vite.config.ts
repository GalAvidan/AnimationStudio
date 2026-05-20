import { defineConfig } from "vite";
import _motionCanvas from "@motion-canvas/vite-plugin";

// @motion-canvas/vite-plugin ships as CJS with `exports.default = fn`.
// In an ESM vite config the whole module.exports becomes the default import,
// so we unwrap the real factory function before calling it.
const motionCanvas =
  ((_motionCanvas as any).default as typeof _motionCanvas) ?? _motionCanvas;

export default defineConfig({
  plugins: [motionCanvas()],
});
