import { AbsoluteFill } from "remotion";
import { IntroScene } from "../scenes/IntroScene";

export const GeneralComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      <IntroScene />
    </AbsoluteFill>
  );
};
