import { makeProject } from "@motion-canvas/core";
import hook from "./scenes/hook";
import solidsSink from "./scenes/solids-sink";
import iceRises from "./scenes/ice-rises";
import molecules from "./scenes/molecules";
import density from "./scenes/density";
import payoff from "./scenes/payoff";

export default makeProject({
  scenes: [hook, solidsSink, iceRises, molecules, density, payoff] as never,
});
