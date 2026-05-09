import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED, FONT_MONO } from "../data/theme";
import { easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type ClosingSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

export const ClosingScene: React.FC<ClosingSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const pipelineOpacity = fadeIn(frame, 0, 22);
  const ideaOpacity = fadeIn(frame, 12, 22);
  const videoOpacity = fadeIn(frame, 24, 22);
  const bridgeProgress = interpolate(frame, [40, 100], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = fadeIn(frame, 110, 26);
  const foundationOpacity = fadeIn(frame, 60, 22);

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        fontFamily: FONT_SANS,
        opacity,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
      }}
    >
      {/* Idea + pipeline + video */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          width: "100%",
        }}
      >
        <div
          style={{
            opacity: ideaOpacity,
            width: 120,
            height: 90,
            background: "#F3F4F6",
            border: "2px dashed #9CA3AF",
            borderRadius: "60% 60% 60% 10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6B7280",
            fontSize: 16,
            fontWeight: 600,
            transform: "rotate(-4deg)",
            flexShrink: 0,
          }}
        >
          idea
        </div>

        {/* Pipeline as a compact row */}
        <div
          style={{
            opacity: pipelineOpacity,
            display: "flex",
            gap: 12,
            alignItems: "center",
            position: "relative",
          }}
        >
          {STAGES.map((stage, i) => (
            <div key={stage.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PipelineTile stage={stage} size="sm" />
              {i < STAGES.length - 1 ? (
                <div style={{ width: 14, height: 2, background: "#9CA3AF" }} />
              ) : null}
            </div>
          ))}

          {/* Bridge line drawn under the row */}
          <div
            style={{
              position: "absolute",
              left: -180,
              right: -180,
              bottom: -28,
              height: 3,
              background: "#111111",
              opacity: bridgeProgress,
              transformOrigin: "left",
              transform: `scaleX(${bridgeProgress})`,
            }}
          />
        </div>

        {/* Video frame */}
        <div
          style={{
            opacity: videoOpacity,
            width: 160,
            height: 100,
            background: "#0F172A",
            borderRadius: 8,
            border: "2px solid #1F2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "22px solid #FFFFFF",
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              marginLeft: 6,
            }}
          />
        </div>
      </div>

      {/* Foundation: agent-context/ visible underneath (dev variant only) */}
      {variant === "dev" ? (
        <div
          style={{
            opacity: foundationOpacity,
            background: "#F0FDFA",
            border: "1.5px solid #0F766E",
            borderRadius: 10,
            padding: "14px 32px",
            fontFamily: FONT_MONO,
            fontSize: 18,
            color: "#0F766E",
            fontWeight: 700,
          }}
        >
          agent-context/   ← source of truth
        </div>
      ) : null}

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
        >
          The pipeline stays.
          <br />
          The story changes.
        </div>
        <div
          style={{
            fontSize: 22,
            color: TEXT_MUTED,
            marginTop: 18,
            fontFamily: FONT_MONO,
          }}
        >
          AnimationStudio
        </div>
      </div>
    </AbsoluteFill>
  );
};
