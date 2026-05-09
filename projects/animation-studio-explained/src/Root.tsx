import "./index.css";
import { Composition } from "remotion";
import { AnimationStudioExplainedGeneral } from "./compositions/AnimationStudioExplainedGeneral";
import { AnimationStudioExplainedDev } from "./compositions/AnimationStudioExplainedDev";
import { FPS as FPS_GENERAL, TOTAL_FRAMES as TOTAL_GENERAL } from "./data/beats-general";
import { FPS as FPS_DEV, TOTAL_FRAMES as TOTAL_DEV } from "./data/beats-dev";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AnimationStudioExplained-General"
        component={AnimationStudioExplainedGeneral}
        durationInFrames={TOTAL_GENERAL}
        fps={FPS_GENERAL}
        width={1920}
        height={1080}
      />
      <Composition
        id="AnimationStudioExplained-Dev"
        component={AnimationStudioExplainedDev}
        durationInFrames={TOTAL_DEV}
        fps={FPS_DEV}
        width={1920}
        height={1080}
      />
    </>
  );
};
