import { makeScene2D, Txt, Layout } from "@motion-canvas/2d";
import { waitFor, easeInOutCubic } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const label = new Txt({
    text: "Why the Sky Is Blue",
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

  yield* label.opacity(1, 0.6, easeInOutCubic);
  yield* waitFor(2);
  yield* label.opacity(0, 0.4, easeInOutCubic);
});
