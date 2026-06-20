import { AbsoluteFill } from "remotion";
import { PaletteViewer } from "../components/PaletteViewer";
import { animationPalettes, defaultPaletteId } from "../data/palettes";

export const PalettePreviewComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <PaletteViewer
        palettes={animationPalettes}
        initialPaletteId={defaultPaletteId}
      />
    </AbsoluteFill>
  );
};
