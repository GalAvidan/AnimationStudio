import { makeProject } from "@motion-canvas/core";
import intro        from "./scenes/intro";
import layers       from "./scenes/layers";
import orchestrator from "./scenes/orchestrator";
import agents       from "./scenes/agents";
import skillsTools  from "./scenes/skills-tools";
import takeaway     from "./scenes/takeaway";

export default makeProject({
  // Cast: makeScene2D returns SceneDescription; @motion-canvas/vite-plugin
  // enriches these into FullSceneDescription at build time.
  scenes: [intro, layers, orchestrator, agents, skillsTools, takeaway] as never,
});
