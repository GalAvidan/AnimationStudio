import { Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core";
import { animationPalettes } from "../data/palettes";

export default makeScene2D(function* (view) {
  const background = new Rect({
    width: 1920,
    height: 1080,
    fill: animationPalettes[0]?.tokens.background ?? "#ffffff",
  });

  const panel = new Rect({
    width: 1500,
    height: 760,
    radius: 28,
    fill: animationPalettes[0]?.tokens.surface ?? "#f8fafc",
    stroke: animationPalettes[0]?.tokens.textSecondary ?? "#334155",
    lineWidth: 3,
  });

  const title = new Txt({
    text: "Palette Review",
    y: -250,
    fontSize: 72,
    fontWeight: 700,
    fill: animationPalettes[0]?.tokens.textPrimary ?? "#0f172a",
  });

  const subtitle = new Txt({
    text: "Scene updates every 2 seconds to preview multiple palettes.",
    y: -178,
    fontSize: 34,
    fill: animationPalettes[0]?.tokens.textSecondary ?? "#334155",
  });

  const paletteName = new Txt({
    text: animationPalettes[0]?.label ?? "Palette",
    y: -86,
    fontSize: 48,
    fontWeight: 600,
    fill: animationPalettes[0]?.tokens.textPrimary ?? "#0f172a",
  });

  const accentChip = new Rect({
    width: 420,
    height: 120,
    y: 40,
    radius: 24,
    fill: animationPalettes[0]?.tokens.accent ?? "#2563eb",
  });

  const accentLabel = new Txt({
    text: "ACCENT",
    y: 40,
    fontSize: 34,
    fontWeight: 700,
    fill: animationPalettes[0]?.tokens.accentText ?? "#ffffff",
  });

  const tokenLine = new Txt({
    text: "",
    y: 198,
    fontSize: 32,
    fill: animationPalettes[0]?.tokens.textSecondary ?? "#334155",
  });

  view.add(background);
  view.add(panel);
  view.add(title);
  view.add(subtitle);
  view.add(paletteName);
  view.add(accentChip);
  view.add(accentLabel);
  view.add(tokenLine);

  for (;;) {
    for (const palette of animationPalettes) {
      background.fill(palette.tokens.background);
      panel.fill(palette.tokens.surface);
      panel.stroke(palette.tokens.textSecondary);
      title.fill(palette.tokens.textPrimary);
      subtitle.fill(palette.tokens.textSecondary);
      paletteName.fill(palette.tokens.textPrimary);
      paletteName.text(palette.label);
      accentChip.fill(palette.tokens.accent);
      accentLabel.fill(palette.tokens.accentText);
      tokenLine.fill(palette.tokens.textSecondary);
      tokenLine.text(
        `bg ${palette.tokens.background} | surface ${palette.tokens.surface} | accent ${palette.tokens.accent}`
      );
      yield* waitFor(2);
    }
  }
});
