import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FileCard } from "../components/FileCard";
import { FolderIcon } from "../components/FolderIcon";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeInOut, fadeIn, sceneOpacity } from "../utils/animation";

type ScriptStageSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

export const ScriptStageScene: React.FC<ScriptStageSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const tileOpacity = fadeIn(frame, 0, 18);
  const cardOpacity = fadeIn(frame, 24, 24);

  // Card flies into folder near the end of the scene.
  const flyStart = Math.max(durationInFrames - 90, 90);
  const flyProgress = interpolate(
    frame,
    [flyStart, flyStart + 60],
    [0, 1],
    {
      easing: easeInOut,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const cardX = interpolate(flyProgress, [0, 1], [0, 480]);
  const cardY = interpolate(flyProgress, [0, 1], [0, 80]);
  const cardScale = interpolate(flyProgress, [0, 1], [1, 0.4]);
  const folderOpacity = fadeIn(frame, flyStart - 20, 20);

  const path =
    variant === "dev"
      ? "scripts/animation-studio-explained_script-dev.md"
      : "scripts/animation-studio-explained_script.md";

  const scriptStage = STAGES[0]; // script

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
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
        <div style={{ opacity: tileOpacity }}>
          <PipelineTile stage={scriptStage} active size="sm" />
        </div>
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
            Stage one
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
            The script
          </div>
        </div>
      </div>

      {/* Body: file card + folder */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 200,
          marginTop: 40,
        }}
      >
        <div
          style={{
            opacity: cardOpacity,
            transform: `translate(${cardX}px, ${cardY}px) scale(${cardScale})`,
            transformOrigin: "center",
          }}
        >
          <FileCard
            filename={variant === "dev" ? "_script-dev.md" : "_script.md"}
            path={variant === "dev" ? path : undefined}
            accent={scriptStage.accent}
          />
        </div>

        <div style={{ opacity: folderOpacity }}>
          <FolderIcon label="scripts/" accent={scriptStage.accent} size="lg" />
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          opacity: cardOpacity,
          fontSize: 24,
          color: TEXT_MUTED,
          textAlign: "center",
          maxWidth: 1300,
          margin: "0 auto",
          lineHeight: 1.5,
        }}
      >
        {variant === "dev"
          ? "A markdown file. Audience, one core idea, narration in plain language. Visual beats flagged inline with [VISUAL: ...] markers."
          : "We take the messy idea and write it down. Who's it for? What's the one thing they should remember?"}
      </div>
    </AbsoluteFill>
  );
};
