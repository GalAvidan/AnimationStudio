import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PipelineStep } from "../components/PipelineStep";
import {
  LOCAL_SYNC,
  PIPELINE_STEPS,
  PIPELINE_STEP_STAGGER,
  PIPELINE_STEP_SUBTITLES,
  PUNCHLINE_LINES,
} from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.pipeline;

  const opacity = sceneOpacity(frame, sync.fadeIn, 145, 18); // no hard fade-out; this is the last scene

  const labelOpacity = fadeIn(frame, 0, 15);

  // Final punchline
  const punchlineOpacity = fadeIn(frame, sync.finalLine, 20);
  const punchlineY = interpolate(
    frame,
    [sync.finalLine, sync.finalLine + 20],
    [16, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        opacity,
      }}
    >
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
        The Full Picture
      </div>

      {/* ── Pipeline flow diagram ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {PIPELINE_STEPS.map((label, i) => {
          const stepStart = sync.appears + i * PIPELINE_STEP_STAGGER;
          const stepProgress = progress(frame, stepStart, stepStart + 20);

          return (
            <PipelineStep
              key={label}
              label={label}
              subtitle={PIPELINE_STEP_SUBTITLES[label]}
              entranceProgress={stepProgress}
              isLast={i === PIPELINE_STEPS.length - 1}
            />
          );
        })}
      </div>

      {/* ── Punchline ── */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: punchlineOpacity,
          transform: `translateY(${punchlineY}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {PUNCHLINE_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: i === 0 ? 34 : 30,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? "#374151" : "#6B7280",
              lineHeight: 1.5,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
