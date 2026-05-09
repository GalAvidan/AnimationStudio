import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BeatMarker } from "../components/BeatMarker";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeOut, easeSpring, fadeIn, sceneOpacity } from "../utils/animation";

type SpecStageSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

const BEATS_PREVIEW: ReadonlyArray<{ title: string; subtitle: string }> = [
  { title: "Hook",             subtitle: "Frame the question" },
  { title: "Pipeline overview", subtitle: "Six stages, in order" },
  { title: "Script stage",     subtitle: "Idea becomes words" },
  { title: "Spec stage",       subtitle: "Words become a contract" },
  { title: "Build stage",      subtitle: "Spec becomes a project" },
];

export const SpecStageScene: React.FC<SpecStageSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const beatStart = 40;
  const beatStagger = 14;

  // "No code" badge stamps near the end of the scene.
  const stampStart = Math.max(durationInFrames - 90, 130);
  const stampScale = interpolate(
    frame,
    [stampStart, stampStart + 14, stampStart + 22],
    [1.6, 0.95, 1],
    { easing: easeSpring, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const stampOpacity = fadeIn(frame, stampStart, 10);

  const specStage = STAGES[1]; // spec

  return (
    <AbsoluteFill
      style={{
        background: "#F8FAFD", // subtle blueprint tint
        backgroundImage:
          "linear-gradient(#0000000a 1px, transparent 1px), linear-gradient(90deg, #0000000a 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        fontFamily: FONT_SANS,
        opacity,
        padding: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: headerOpacity,
        }}
      >
        <PipelineTile stage={specStage} active size="sm" />
        <div>
          <div
            style={{
              fontSize: 18,
              color: TEXT_MUTED,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Stage two
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: TEXT_PRIMARY,
              letterSpacing: "-0.02em",
              marginTop: 4,
            }}
          >
            The spec
          </div>
          <div
            style={{
              fontSize: 22,
              color: TEXT_MUTED,
              marginTop: 8,
            }}
          >
            {variant === "dev"
              ? "The contract between explanation and visuals."
              : "What we say. What we show. The contract between them."}
          </div>
        </div>
      </div>

      {/* Body: stack of beat cards */}
      <div
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: 60,
          flex: 1,
        }}
      >
        {/* Beats stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {BEATS_PREVIEW.map((beat, i) => {
            const start = beatStart + i * beatStagger;
            const o = fadeIn(frame, start, 14);
            const x = interpolate(frame, [start, start + 22], [-30, 0], {
              easing: easeOut,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={beat.title}
                style={{ opacity: o, transform: `translateX(${x}px)` }}
              >
                <BeatMarker
                  index={i + 1}
                  title={beat.title}
                  subtitle={beat.subtitle}
                  accent={specStage.accent}
                  width={420}
                />
              </div>
            );
          })}
        </div>

        {/* No-code stamp */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            height: 380,
          }}
        >
          {/* spec sections list (dev only) */}
          {variant === "dev" ? (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                opacity: fadeIn(frame, 30, 22),
                fontSize: 18,
                color: specStage.accent,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              }}
            >
              {[
                "## Project",
                "## Visual Philosophy",
                "## Beat Map",
                "## Sync Points",
                "## Constraints",
                "## Review Checklist",
              ].map((line, i) => {
                const o = fadeIn(frame, 40 + i * 12, 14);
                return (
                  <div key={line} style={{ opacity: o }}>
                    {line}
                  </div>
                );
              })}
            </div>
          ) : null}

          <div
            style={{
              opacity: stampOpacity,
              transform: `rotate(-12deg) scale(${stampScale})`,
              border: "5px solid #DC2626",
              color: "#DC2626",
              padding: "12px 28px",
              borderRadius: 8,
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: FONT_SANS,
              background: "rgba(255,255,255,0.92)",
            }}
          >
            No&nbsp;Code
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
