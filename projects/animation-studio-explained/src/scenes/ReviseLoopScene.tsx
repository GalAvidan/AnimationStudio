import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FlowArrow } from "../components/FlowArrow";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type ReviseLoopSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

export const ReviseLoopScene: React.FC<ReviseLoopSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const tilesOpacity = fadeIn(frame, 12, 18);
  const arrow1 = interpolate(frame, [60, 130], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrow2 = interpolate(frame, [110, 180], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const reviseStage = STAGES[5]; // revise
  const specStage = STAGES[1];
  const buildStage = STAGES[2];

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        fontFamily: FONT_SANS,
        opacity,
        padding: 80,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: headerOpacity,
        }}
      >
        <PipelineTile stage={reviseStage} active size="sm" />
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
            Stage six
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
            Revise
          </div>
          <div style={{ fontSize: 22, color: TEXT_MUTED, marginTop: 8 }}>
            {variant === "dev"
              ? "Direction change → spec. Implementation only → code."
              : "If the direction changes, back to the spec. If only the look, tweak the code."}
          </div>
        </div>
      </div>

      {/* Diagram */}
      <div style={{ flex: 1, position: "relative", marginTop: 40 }}>
        {/* Tiles in a triangle layout */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: tilesOpacity,
          }}
        >
          <PipelineTile stage={reviseStage} active size="md" />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "20%",
            opacity: tilesOpacity,
          }}
        >
          <PipelineTile stage={specStage} size="md" />
          <div
            style={{
              marginTop: 10,
              fontSize: 16,
              color: specStage.accent,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              textAlign: "center",
            }}
          >
            specs/
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: "20%",
            opacity: tilesOpacity,
          }}
        >
          <PipelineTile stage={buildStage} size="md" />
          <div
            style={{
              marginTop: 10,
              fontSize: 16,
              color: buildStage.accent,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              textAlign: "center",
            }}
          >
            src/scenes/
          </div>
        </div>

        {/* Branching arrows */}
        <FlowArrow
          d="M 880 280 C 700 360 520 480 460 600"
          drawProgress={arrow1}
          color={specStage.accent}
          pathLength={500}
          width={1760}
          height={780}
          label="direction change"
          labelPosition={{ x: 600, y: 460 }}
        />
        <FlowArrow
          d="M 980 280 C 1160 360 1340 480 1400 600"
          drawProgress={arrow2}
          color={buildStage.accent}
          pathLength={500}
          width={1760}
          height={780}
          label="implementation only"
          labelPosition={{ x: 1260, y: 460 }}
        />
      </div>
    </AbsoluteFill>
  );
};
