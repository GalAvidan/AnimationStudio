import { makeProject } from "@motion-canvas/core";
import intro from "./scenes/intro";
import palettePreview from "./scenes/palette-preview";

export default makeProject({
  // Cast: makeScene2D returns SceneDescription; @motion-canvas/vite-plugin
  // enriches these into FullSceneDescription at build time.
  scenes: [intro, palettePreview] as never,
});
