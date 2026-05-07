import "./index.css";
import { Composition } from "remotion";
import { ExplainerStarterComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ExplainerStarter"
        component={ExplainerStarterComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
