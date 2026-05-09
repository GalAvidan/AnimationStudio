import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  LOCAL_SYNC_TECH,
  PIPELINE_LINE_STAGGER,
  TECH_PIPELINE_LINES,
} from "../data/beats-technical";
import { fadeIn, progress } from "../utils/animation";

export const TechPipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.fullPipeline;

  // Last scene — no hard fadeOut
  const sceneOpacityVal = fadeIn(frame, sync.fadeIn, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const captionOpacity = fadeIn(frame, sync.final, 22);
  const captionY = interpolate(
    frame,
    [sync.final, sync.final + 22],
    [16, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", opacity: sceneOpacityVal }}>
      {/* ── Scene label ── */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontSize: 26,
          fontWeight: 700,
          color: "#9CA3AF",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: labelOpacity,
        }}
      >
        10 — The Full Pipeline
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 40,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        End to end: tokenization to output.
      </div>

      {/* ── Pipeline lines ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -45%)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 1400,
        }}
      >
        {TECH_PIPELINE_LINES.map((line, i) => {
          const lineStart = sync.start + i * PIPELINE_LINE_STAGGER;
          const lineP = progress(frame, lineStart, lineStart + 22);

          const lineOpacity = interpolate(lineP, [0, 0.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const lineY = interpolate(lineP, [0, 1], [16, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`line-${i}`}
              style={{
                background: i === 0 ? "#F1F5F9" : i === 1 ? "#D1FAE5" : "#EEF2FF",
                border: `2px solid ${i === 0 ? "#CBD5E1" : i === 1 ? "#6EE7B7" : "#A5B4FC"}`,
                borderRadius: 14,
                padding: "22px 36px",
                fontSize: 26,
                fontFamily: "monospace",
                fontWeight: 600,
                color: "#1E293B",
                opacity: lineOpacity,
                transform: `translateY(${lineY}px)`,
                letterSpacing: "0.01em",
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* ── Punchline ── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 34,
          fontWeight: 700,
          color: "#111111",
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
          fontFamily: "monospace",
        }}
      >
        f(context_tokens) → next_token_distribution
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 55,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 22,
          fontWeight: 500,
          color: "#9CA3AF",
          opacity: captionOpacity,
        }}
      >
        Everything else is scaffolding.
      </div>
    </AbsoluteFill>
  );
};
