import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FlowArrow } from "../components/FlowArrow";
import { FolderIcon } from "../components/FolderIcon";
import { BACKGROUND, FONT_SANS, FONT_MONO, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type AgentContextSceneProps = {
  durationInFrames: number;
};

const ADAPTERS: ReadonlyArray<string> = [
  "AGENTS.md",
  "CLAUDE.md",
  ".github/copilot-instructions.md",
  "BOT.md",
];

const SUBFOLDERS: ReadonlyArray<{ label: string; angle: number }> = [
  { label: "intent/", angle: -60 },
  { label: "map/",    angle: -20 },
  { label: "skills/", angle: 20 },
  { label: "tasks/",  angle: 60 },
];

/** DEV-ONLY scene (beat 11). The architectural payoff. */
export const AgentContextScene: React.FC<AgentContextSceneProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const adapterStagger = 10;
  const arrowsStart = 60;
  const arrowProgress = interpolate(frame, [arrowsStart, arrowsStart + 50], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const folderOpacity = fadeIn(frame, 90, 22);
  const radiateProgress = interpolate(frame, [140, 230], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          The foundation
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
          agent-context/ is the source of truth.
        </div>
      </div>

      <div style={{ flex: 1, position: "relative", marginTop: 30 }}>
        {/* Adapter files at top */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {ADAPTERS.map((name, i) => {
            const o = fadeIn(frame, i * adapterStagger, 18);
            return (
              <div
                key={name}
                style={{
                  opacity: o,
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderTop: "4px solid #6B7280",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontFamily: FONT_MONO,
                  fontSize: 14,
                  color: "#374151",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                {name}
              </div>
            );
          })}
        </div>

        {/* Arrows from adapters down to agent-context/ */}
        <FlowArrow
          d="M 480 110 L 880 380"
          drawProgress={arrowProgress}
          color="#9CA3AF"
          thickness={2}
          pathLength={600}
          width={1760}
          height={760}
          dashed
        />
        <FlowArrow
          d="M 760 110 L 880 380"
          drawProgress={arrowProgress}
          color="#9CA3AF"
          thickness={2}
          pathLength={500}
          width={1760}
          height={760}
          dashed
        />
        <FlowArrow
          d="M 1000 110 L 880 380"
          drawProgress={arrowProgress}
          color="#9CA3AF"
          thickness={2}
          pathLength={500}
          width={1760}
          height={760}
          dashed
        />
        <FlowArrow
          d="M 1280 110 L 880 380"
          drawProgress={arrowProgress}
          color="#9CA3AF"
          thickness={2}
          pathLength={600}
          width={1760}
          height={760}
          dashed
        />

        {/* Central agent-context folder */}
        <div
          style={{
            position: "absolute",
            top: 360,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: folderOpacity,
          }}
        >
          <FolderIcon label="agent-context/" accent="#0F766E" size="lg" />
        </div>

        {/* Radiating subfolders */}
        {SUBFOLDERS.map((sf, i) => {
          const startFrame = 150 + i * 12;
          const o = fadeIn(frame, startFrame, 18);
          const radius = 280 * radiateProgress;
          const rad = (sf.angle * Math.PI) / 180;
          const dx = Math.sin(rad) * radius;
          const dy = -Math.cos(rad) * radius * 0.4 + 280;
          return (
            <div
              key={sf.label}
              style={{
                position: "absolute",
                top: 360,
                left: "50%",
                opacity: o,
                transform: `translate(calc(-50% + ${dx}px), ${dy}px)`,
              }}
            >
              <div
                style={{
                  background: "#F0FDFA",
                  border: "1.5px solid #0F766E",
                  borderRadius: 8,
                  padding: "10px 18px",
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: "#0F766E",
                  fontWeight: 600,
                }}
              >
                {sf.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
