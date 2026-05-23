import { makeProject } from "@motion-canvas/core";
import main from "./scenes/main";

export default makeProject({
  // Cast: makeScene2D returns SceneDescription; @motion-canvas/vite-plugin
  // enriches these into FullSceneDescription at build time.
  scenes: [main] as never,
});
