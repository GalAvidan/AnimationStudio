import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TerminologyCard } from "../components/TerminologyCard";
import { BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type TerminologySceneProps = {
  durationInFrames: number;
};

/**
 * DEV-VARIANT drill-down.
 * Three terminology cards stack: Beat / Scene / Sync Point.
 */
const TERMS = [
  {
    term: "Beat",
    definition: "An atomic moment of viewer understanding. One idea landing.",
    example: "// Beat 5 — drill-down: what is a beat?",
    accent: "#2C5BA1",
  },
  {
    term: "Scene",
    definition: "A group of beats sharing a visual world. One scene maps to one React component.",
    example: "src/scenes/PipelineOverviewScene.tsx",
    accent: "#1F8A4C",
  },
  {
    term: "Sync Point",
    definition: "A named moment where motion has to land. Resolved to frames at build time.",
    example: "pipeline-revealed",
    accent: "#6B40C4",
  },
];

export const TerminologyScene: React.FC<TerminologySceneProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const cardStart = 30;
  const cardStagger = 80;

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
      }}
    >
      <div style={{ opacity: headerOpacity, textAlign: "center" }}>
        <div
          style={{
            fontSize: 22,
            color: TEXT_MUTED,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          The terms we use
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.02em",
            marginTop: 8,
          }}
        >
          Beat. Scene. Sync point.
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          marginTop: 40,
        }}
      >
        {TERMS.map((t, i) => {
          const start = cardStart + i * cardStagger;
          const o = fadeIn(frame, start, 18);
          const y = interpolate(frame, [start, start + 24], [40, 0], {
            easing: easeOut,
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={t.term}
              style={{ opacity: o, transform: `translateY(${y}px)` }}
            >
              <TerminologyCard
                term={t.term}
                definition={t.definition}
                example={t.example}
                accent={t.accent}
                width={900}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
