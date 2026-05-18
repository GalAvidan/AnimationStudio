import { makeScene2D, Txt, Layout } from "@motion-canvas/2d";
import { waitFor, all, easeInOutCubic } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const label = new Txt({
    text: "Project Title",
    fontSize: 72,
    fill: "#ffffff",
    opacity: 0,
  });

  view.add(
    new Layout({
      width: 1920,
      height: 1080,
      justifyContent: "center",
      alignItems: "center",
      children: [label],
    })
  );

  // Fade in
  yield* label.opacity(1, 0.6, easeInOutCubic);
  yield* waitFor(2);
  // Fade out
  yield* label.opacity(0, 0.4, easeInOutCubic);
});
