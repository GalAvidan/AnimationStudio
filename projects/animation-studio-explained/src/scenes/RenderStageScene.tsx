import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CodeSnippetReveal } from "../components/CodeSnippetReveal";
import { FolderIcon } from "../components/FolderIcon";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeInOut, easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type RenderStageSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

export const RenderStageScene: React.FC<RenderStageSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const terminalOpacity = fadeIn(frame, 18, 18);
  const folderOpacity = fadeIn(frame, 30, 22);

  const progressBarStart = 60;
  const progressBarEnd = Math.max(durationInFrames - 70, progressBarStart + 90);
  const progressBar = interpolate(
    frame,
    [progressBarStart, progressBarEnd],
    [0, 1],
    { easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // mp4 icon flies into the output folder once render reaches 100%.
  const dropStart = progressBarEnd;
  const dropProgress = interpolate(
    frame,
    [dropStart, dropStart + 30],
    [0, 1],
    { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fileX = interpolate(dropProgress, [0, 1], [-180, 240]);
  const fileY = interpolate(dropProgress, [0, 1], [-40, 30]);
  const fileScale = interpolate(dropProgress, [0, 1], [1, 0.5]);
  const fileOpacity = interpolate(dropProgress, [0, 0.85, 1], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const renderStage = STAGES[4]; // render

  const terminalLines =
    variant === "dev"
      ? [
          "$ npx remotion render AnimationStudioExplained_Dev \\",
          "    --props=props/dev.json \\",
          "    output/animation-studio-explained-dev.mp4",
          "",
          "Bundling... done.",
          `Rendering frames... ${Math.round(progressBar * 100)}%`,
        ]
      : [
          "rendering animation-studio-explained.mp4...",
          `progress: ${Math.round(progressBar * 100)}%`,
        ];
  const linesShown = interpolate(
    frame,
    [18, 60],
    [0, terminalLines.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
        <PipelineTile stage={renderStage} active size="sm" />
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
            Stage five
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
            Render
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 100,
          marginTop: 30,
          position: "relative",
        }}
      >
        <div style={{ opacity: terminalOpacity, position: "relative" }}>
          <CodeSnippetReveal
            lines={terminalLines}
            linesShown={linesShown}
            variant="terminal"
            width={variant === "dev" ? 760 : 560}
            title={variant === "dev" ? "render" : undefined}
            fontSize={variant === "dev" ? 16 : 18}
          />
          {/* progress bar overlay */}
          <div
            style={{
              marginTop: 14,
              width: "100%",
              height: 14,
              background: "#1F2937",
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressBar * 100}%`,
                height: "100%",
                background: "linear-gradient(90deg, #FBBF24, #F59E0B)",
              }}
            />
          </div>

          {/* mp4 file icon that flies after render completes */}
          <div
            style={{
              position: "absolute",
              right: -160,
              top: 80,
              opacity: fileOpacity,
              transform: `translate(${fileX}px, ${fileY}px) scale(${fileScale})`,
            }}
          >
            <Mp4Icon />
          </div>
        </div>

        <div style={{ opacity: folderOpacity }}>
          <FolderIcon label="output/" accent={renderStage.accent} size="lg" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Mp4Icon: React.FC = () => (
  <div
    style={{
      width: 110,
      height: 130,
      background: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderTop: "5px solid #1F8A4C",
      borderRadius: 8,
      boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 800, color: "#1F8A4C" }}>MP4</div>
    <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>video</div>
  </div>
);
