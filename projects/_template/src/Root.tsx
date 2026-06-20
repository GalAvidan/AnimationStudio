import { Composition } from "remotion";
import { GeneralComposition } from "./compositions/GeneralComposition";
import { PalettePreviewComposition } from "./compositions/PalettePreviewComposition";

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
      <Composition
        id="ProjectNamePalettePreview"
        component={PalettePreviewComposition}
        durationInFrames={3600}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
