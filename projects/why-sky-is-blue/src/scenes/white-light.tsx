import { makeScene2D, Rect, Line, Txt } from "@motion-canvas/2d";
import { all, easeInOutCubic, easeOutCubic, waitFor } from "@motion-canvas/core";
import { COLORS, SPECTRUM, SYNC } from "../data/beats-general";

// Beat 2 — White light (~8s)
// A single white ray enters from upper-right.
// At SYNC.spectrumFan (3s): white ray fades, 6 colored rays fan open from the same origin.

// All rays originate from upper-right
const SOURCE: [number, number] = [700, -350];

// Each colored ray fans to a different lower-left endpoint
const FAN_ENDS: [number, number][] = [
  [-850, -380], // red    — upper-left
  [-850, -150], // orange
  [-850,  90],  // yellow — roughly left
  [-850,  290], // green
  [-850,  450], // blue
  [-820,  510], // violet — lower-left
];

export default makeScene2D(function* (view) {
  const bg = new Rect({ width: 1920, height: 1080, fill: COLORS.bg });

  // Incoming white ray (source → lower-left, passing through center)
  const whiteLine = new Line({
    points: [SOURCE, [-750, 370]],
    stroke: COLORS.white,
    lineWidth: 5,
    end: 0,
  });

  // Fan rays — one per spectrum color
  const fanLines = SPECTRUM.map((s, i) =>
    new Line({
      points: [SOURCE, FAN_ENDS[i]],
      stroke: s.color,
      lineWidth: 4,
      end: 0,
      opacity: 0,
    })
  );

  // Narrative caption — appears as the white ray draws in
  const caption = new Txt({
    text: "Sunlight looks white — but it's every color at once.",
    fontSize: 48,
    fill: COLORS.white,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    y: 400,
  });

  // Zone label — identifies the spread after the fan opens
  const spectrumLabel = new Txt({
    text: "Visible light spectrum",
    fontSize: 30,
    fill: COLORS.atmosphere,
    fontFamily: "Inter, system-ui, sans-serif",
    opacity: 0,
    x: -560, y: -40,
  });

  view.add(bg);
  view.add(whiteLine);
  fanLines.forEach(l => view.add(l));
  view.add(spectrumLabel);
  view.add(caption);

  // White ray draws in; caption appears concurrently
  yield* all(
    whiteLine.end(1, 2, easeOutCubic),
    caption.opacity(1, 0.6, easeInOutCubic),
  );
  yield* waitFor(SYNC.spectrumFan - 2); // = 1s

  // SYNC: spectrum-fan — white fades, colored rays fan open, zone label appears
  yield* all(
    whiteLine.opacity(0, 0.5),
    spectrumLabel.opacity(0.85, 0.6, easeInOutCubic),
    ...fanLines.flatMap(l => [
      l.opacity(1, 0.2),
      l.end(1, 0.8, easeOutCubic),
    ]),
  );

  yield* waitFor(3.5); // hold on full spectrum

  // Fade out
  yield* all(
    caption.opacity(0, 0.6, easeInOutCubic),
    spectrumLabel.opacity(0, 0.6, easeInOutCubic),
    ...fanLines.map(l => l.opacity(0, 0.7, easeInOutCubic)),
  ); // ~8s total
});
