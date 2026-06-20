import { AbsoluteFill } from "remotion";
import { IntroScene } from "../scenes/IntroScene";
import { animationPalettes, defaultPaletteId } from "../data/palettes";

export const GeneralComposition: React.FC = () => {
  const fallbackPalette = animationPalettes[0];
  const selectedPalette =
    animationPalettes.find((palette) => palette.id === defaultPaletteId) ??
    fallbackPalette;

  return (
    <AbsoluteFill style={{ backgroundColor: selectedPalette?.tokens.background ?? "#ffffff" }}>
      <IntroScene />
    </AbsoluteFill>
  );
};
