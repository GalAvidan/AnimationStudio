import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FlowArrow } from "../components/FlowArrow";
import { FolderIcon } from "../components/FolderIcon";
import { BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type MultiCompositionSceneProps = {
  durationInFrames: number;
};

/**
 * DEV-ONLY scene (beat 7).
 * Two composition cards both point down into one shared `scenes/` folder.
 * Each composition reads from its own beats-*.ts file.
 * Self-referential: this is the very pattern the viewer is watching.
 */
export const MultiCompositionScene: React.FC<MultiCompositionSceneProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const leftCardOpacity = fadeIn(frame, 24, 22);
  const rightCardOpacity = fadeIn(frame, 36, 22);
  const folderOpacity = fadeIn(frame, 60, 22);

  const arrowProgress = interpolate(frame, [80, 140], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const annotationOpacity = fadeIn(frame, 200, 24);

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        fontFamily: FONT_SANS,
        opacity,
        padding: 80,
      }}
    >
      <div style={{ textAlign: "center", opacity: headerOpacity }}>
        <div
          style={{
            fontSize: 22,
            color: TEXT_MUTED,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          One project, multiple compositions
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.02em",
            marginTop: 6,
          }}
        >
          Shared scenes. Per-variant beats.
        </div>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Two composition cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 320,
            marginTop: 20,
          }}
        >
          <CompositionCard
            opacity={leftCardOpacity}
            title="General"
            beatsFile="beats-general.ts"
            color="#A07A28"
          />
          <CompositionCard
            opacity={rightCardOpacity}
            title="Dev"
            beatsFile="beats-dev.ts"
            color="#6B40C4"
          />
        </div>

        {/* Arrows pointing into shared scenes folder */}
        <FlowArrow
          d="M 700 380 C 750 460 820 520 880 580"
          drawProgress={arrowProgress}
          color="#A07A28"
          pathLength={300}
          width={1760}
          height={620}
        />
        <FlowArrow
          d="M 1060 380 C 1010 460 940 520 880 580"
          drawProgress={arrowProgress}
          color="#6B40C4"
          pathLength={300}
          width={1760}
          height={620}
        />

        {/* Shared scenes folder */}
        <div
          style={{
            opacity: folderOpacity,
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <FolderIcon label="src/scenes/" accent="#1F8A4C" size="lg" />
          <div
            style={{
              fontSize: 16,
              color: TEXT_MUTED,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            shared by both compositions
          </div>
        </div>

        {/* Self-referential annotation */}
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 60,
            opacity: annotationOpacity,
            background: "#FFFBEB",
            border: "1px dashed #C77A1F",
            color: "#92400E",
            padding: "10px 16px",
            borderRadius: 8,
            fontSize: 16,
            maxWidth: 280,
          }}
        >
          ← you are watching this
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CompositionCard: React.FC<{
  opacity: number;
  title: string;
  beatsFile: string;
  color: string;
}> = ({ opacity, title, beatsFile, color }) => (
  <div
    style={{
      opacity,
      width: 320,
      background: "#FFFFFF",
      border: `2px solid ${color}`,
      borderRadius: 12,
      padding: 24,
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}
  >
    <div style={{ fontSize: 14, color, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
      Composition
    </div>
    <div style={{ fontSize: 32, fontWeight: 800, color: "#111111" }}>{title}</div>
    <div
      style={{
        fontSize: 14,
        color: "#374151",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        marginTop: 6,
        background: "#F3F4F6",
        padding: "6px 10px",
        borderRadius: 6,
      }}
    >
      reads {beatsFile}
    </div>
  </div>
);
