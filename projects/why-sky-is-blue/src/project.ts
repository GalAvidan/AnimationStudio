import { makeProject } from "@motion-canvas/core";
import question   from "./scenes/question";
import whiteLight from "./scenes/white-light";
import atmosphere from "./scenes/atmosphere";
import scattering from "./scenes/scattering";
import violet     from "./scenes/violet";
import sunset     from "./scenes/sunset";
import payoff     from "./scenes/payoff";

export default makeProject({
  // Cast: makeScene2D returns SceneDescription; @motion-canvas/vite-plugin
  // enriches these into FullSceneDescription at build time.
  scenes: [question, whiteLight, atmosphere, scattering, violet, sunset, payoff] as never,
});
