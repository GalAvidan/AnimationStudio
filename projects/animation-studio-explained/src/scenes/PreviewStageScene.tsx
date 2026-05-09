import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CodeSnippetReveal } from "../components/CodeSnippetReveal";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { fadeIn, sceneOpacity } from "../utils/animation";

type PreviewStageSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

export const PreviewStageScene: React.FC<PreviewStageSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const terminalOpacity = fadeIn(frame, 18, 18);
  const studioOpacity = fadeIn(frame, 60, 22);

  // Playhead sweeps the timeline once the studio is visible.
  const sweepProgress = interpolate(frame, [90, durationInFrames - 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const previewStage = STAGES[3]; // preview

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
        <PipelineTile stage={previewStage} active size="sm" />
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
            Stage four
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
            Preview
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          marginTop: 30,
        }}
      >
        {variant === "dev" ? (
          <div style={{ opacity: terminalOpacity }}>
            <CodeSnippetReveal
              lines={["$ npm run dev", "remotion studio launching..."]}
              linesShown={interpolate(frame, [18, 60], [0, 2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              variant="terminal"
              width={620}
              title="powershell"
              showCaret
            />
          </div>
        ) : null}

        <div
          style={{
            opacity: studioOpacity,
            width: 1100,
            height: 480,
            background: "#FAFAFA",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              height: 36,
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: 8,
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FF6058" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FFBC2E" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#28C940" }} />
            <div style={{ marginLeft: 14, fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
              Remotion Studio — animation-studio-explained
            </div>
          </div>

          {/* Sidebar + preview area */}
          <div style={{ flex: 1, display: "flex" }}>
            <div
              style={{
                width: 220,
                borderRight: "1px solid #E5E7EB",
                padding: 14,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 13,
                color: "#374151",
              }}
            >
              <div style={{ color: "#9CA3AF", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Compositions
              </div>
              <div style={{ background: "#EEF2FF", color: "#3730A3", padding: "6px 8px", borderRadius: 4 }}>
                AnimationStudioExplained_General
              </div>
              <div style={{ padding: "6px 8px", borderRadius: 4 }}>
                AnimationStudioExplained_Dev
              </div>
            </div>

            <div
              style={{
                flex: 1,
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9CA3AF",
                fontSize: 18,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "70%",
                  aspectRatio: "16/9",
                  border: "2px solid #E5E7EB",
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #F9FAFB, #EEF2FF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6B40C4",
                  fontWeight: 700,
                  fontSize: 22,
                }}
              >
                preview frame
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div
            style={{
              height: 80,
              borderTop: "1px solid #E5E7EB",
              padding: "12px 16px",
              position: "relative",
              background: "#FAFAFA",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                top: 28,
                height: 24,
                background: "#E5E7EB",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, #C4B5FD, #A78BFA, #8B5CF6)",
                  width: `${sweepProgress * 100}%`,
                }}
              />
            </div>
            {/* Playhead line */}
            <div
              style={{
                position: "absolute",
                left: `calc(16px + ${sweepProgress} * (100% - 32px))`,
                top: 12,
                bottom: 12,
                width: 2,
                background: "#6B40C4",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
