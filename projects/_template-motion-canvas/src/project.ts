import { makeProject } from "@motion-canvas/core";
import intro from "./scenes/intro";

export default makeProject({
  // Cast: makeScene2D returns SceneDescription; @motion-canvas/vite-plugin
  // enriches these into FullSceneDescription at build time.
  scenes: [intro] as never,
});
