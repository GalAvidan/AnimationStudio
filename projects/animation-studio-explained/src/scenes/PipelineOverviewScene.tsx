import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type PipelineOverviewSceneProps = {
  durationInFrames: number;
};

const TILE_STAGGER = 18; // frames between each tile entrance

export const PipelineOverviewScene: React.FC<PipelineOverviewSceneProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);

  // The "now active" tile rolls across the row after all tiles have landed.
  const allLandedFrame = TILE_STAGGER * STAGES.length + 20;
  const sweepProgress = interpolate(
    frame,
    [allLandedFrame, allLandedFrame + 90],
    [0, STAGES.length - 0.001],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const activeIndex = Math.floor(sweepProgress);

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
        gap: 60,
      }}
    >
      <div
        style={{
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: TEXT_MUTED,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          The pipeline
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.03em",
          }}
        >
          Six stages. Every animation.
        </div>
      </div>

      {/* Pipeline row */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {STAGES.map((stage, i) => {
          const tileStart = i * TILE_STAGGER;
          const tileOpacity = fadeIn(frame, tileStart, 18);
          const tileY = interpolate(
            frame,
            [tileStart, tileStart + 22],
            [40, 0],
            { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const isActive = frame >= allLandedFrame && i === activeIndex;
          return (
            <div
              key={stage.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: tileOpacity,
                transform: `translateY(${tileY}px)`,
              }}
            >
              <PipelineTile stage={stage} active={isActive} />
              {i < STAGES.length - 1 ? (
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: "#9CA3AF",
                    opacity: tileOpacity,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
