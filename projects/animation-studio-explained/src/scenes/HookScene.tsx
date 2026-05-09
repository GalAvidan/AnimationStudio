import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT_SANS, TEXT_PRIMARY, TEXT_MUTED, BACKGROUND } from "../data/theme";
import { easeSpring, fadeIn, sceneOpacity } from "../utils/animation";

type HookSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

export const HookScene: React.FC<HookSceneProps> = ({ durationInFrames, variant }) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const titleOpacity = fadeIn(frame, 6, 22);
  const titleY = interpolate(frame, [6, 28], [18, 0], {
    easing: easeSpring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ideaOpacity = fadeIn(frame, 26, 22);
  const videoOpacity = fadeIn(frame, 50, 22);
  const questionOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse the question mark
  const pulse = 1 + 0.08 * Math.sin((frame - 95) * 0.18);
  const pulseScale = frame > 95 ? pulse : 1;

  const subtitle =
    variant === "general"
      ? "By the end of this video, that idea is something you can press play on."
      : "We want it to become a clear, rendered animation. This is the pipeline that gets us there.";

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        fontFamily: FONT_SANS,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: TEXT_MUTED,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          AnimationStudio
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.03em",
            maxWidth: 1100,
          }}
        >
          From an idea&hellip;
          <br />
          to something you can watch.
        </div>
      </div>

      {/* Idea → ? → Video */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {/* Thought bubble */}
        <div
          style={{
            opacity: ideaOpacity,
            width: 220,
            height: 160,
            background: "#F3F4F6",
            border: "2px dashed #9CA3AF",
            borderRadius: "60% 60% 60% 10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6B7280",
            fontSize: 22,
            fontWeight: 600,
            transform: "rotate(-3deg)",
          }}
        >
          idea
        </div>

        {/* Question mark */}
        <div
          style={{
            opacity: questionOpacity,
            transform: `scale(${pulseScale})`,
            fontSize: 120,
            fontWeight: 900,
            color: TEXT_PRIMARY,
            lineHeight: 1,
          }}
        >
          ?
        </div>

        {/* Video frame / mp4 file */}
        <div
          style={{
            opacity: videoOpacity,
            width: 260,
            height: 160,
            background: "#0F172A",
            borderRadius: 12,
            border: "2px solid #1F2937",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "32px solid #FFFFFF",
              borderTop: "20px solid transparent",
              borderBottom: "20px solid transparent",
              marginLeft: 8,
            }}
          />
          {variant === "dev" ? (
            <div
              style={{
                position: "absolute",
                bottom: 10,
                fontSize: 13,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                color: "#9CA3AF",
              }}
            >
              output/&lt;name&gt;.mp4
            </div>
          ) : null}
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: ideaOpacity,
          fontSize: 26,
          color: TEXT_MUTED,
          textAlign: "center",
          maxWidth: 1100,
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
