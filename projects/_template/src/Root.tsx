import { Composition } from "remotion";
import { GeneralComposition } from "./compositions/GeneralComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProjectNameGeneral"
        component={GeneralComposition}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
