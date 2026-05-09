import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CodeSnippetReveal } from "../components/CodeSnippetReveal";
import { PipelineTile } from "../components/PipelineTile";
import { STAGES, BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { fadeIn, sceneOpacity } from "../utils/animation";

type BuildStageSceneProps = {
  durationInFrames: number;
  variant: "general" | "dev";
};

const TREE_LINES_DEV: ReadonlyArray<string> = [
  "projects/animation-studio-explained/",
  "├─ src/",
  "│  ├─ Root.tsx",
  "│  ├─ index.ts",
  "│  ├─ compositions/",
  "│  │  ├─ AnimationStudioExplainedGeneral.tsx",
  "│  │  └─ AnimationStudioExplainedDev.tsx",
  "│  ├─ scenes/         ← one per beat",
  "│  ├─ components/     ← reusable visuals",
  "│  ├─ data/           ← beats + timing",
  "│  └─ utils/          ← easing helpers",
  "├─ remotion.config.ts",
  "├─ tsconfig.json",
  "└─ package.json",
];

const TREE_LINES_GENERAL: ReadonlyArray<string> = [
  "projects/animation-studio-explained/",
  "  scenes/   ← one per beat",
  "  pieces/   ← reusable shapes",
  "  data/     ← timing",
];

export const BuildStageScene: React.FC<BuildStageSceneProps> = ({
  durationInFrames,
  variant,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);

  const lines = variant === "dev" ? TREE_LINES_DEV : TREE_LINES_GENERAL;
  // Reveal lines progressively across the scene.
  const revealStart = 30;
  const revealEnd = Math.max(durationInFrames - 50, revealStart + lines.length * 8);
  const linesShown = interpolate(
    frame,
    [revealStart, revealEnd],
    [0, lines.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const buildStage = STAGES[2]; // build

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
        <PipelineTile stage={buildStage} active size="sm" />
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
            Stage three
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
            Build
          </div>
          <div style={{ fontSize: 22, color: TEXT_MUTED, marginTop: 8 }}>
            {variant === "dev"
              ? "The reviewed spec becomes a Remotion project."
              : "The pieces snap into a project folder we can run."}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <CodeSnippetReveal
          lines={lines}
          linesShown={linesShown}
          variant={variant === "dev" ? "terminal" : "plain"}
          width={variant === "dev" ? 940 : 720}
          title={variant === "dev" ? "folder tree" : undefined}
          fontSize={variant === "dev" ? 18 : 22}
        />
      </div>
    </AbsoluteFill>
  );
};
