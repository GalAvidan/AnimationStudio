import { makeProject } from "@motion-canvas/core";
import scene1 from "./scenes/scene1";
import scene2 from "./scenes/scene2";

// `makeScene2D` returns `SceneDescription`; `makeProject` is typed to expect
// `FullSceneDescription`. The Motion Canvas Vite plugin enriches scene
// descriptions with the missing metadata at build time, so the cast is safe
// and mirrors the pattern used across MC v3 projects.
export default makeProject({
  scenes: [scene1, scene2] as never,
});
