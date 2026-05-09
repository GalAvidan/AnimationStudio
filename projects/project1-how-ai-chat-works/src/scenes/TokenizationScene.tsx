import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TokenPill } from "../components/TokenPill";
import {
  LOCAL_SYNC,
  PILL_FINAL_LEFT,
  PILL_START_LEFT,
  SUBWORDS,
} from "../data/beats";
import { easeSpring, fadeIn, progress, sceneOpacity } from "../utils/animation";

// Vertical center of the pill row (scene height 1080px)
const PILL_TOP = 500; // top of pill (height 80px → center at 540)

export const TokenizationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.tokenization;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);

  // Scene label fade-in
  const labelOpacity = fadeIn(frame, 0, 15);

  // Full word "Understanding" visible before split
  const fullWordOpacity = interpolate(frame, [sync.split, sync.split + 14], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pills visible after split
  const pillsEntranceOpacity = interpolate(
    frame,
    [sync.split, sync.split + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Subtitle below pills appears after all flips are done
  const subtitleOpacity = fadeIn(frame, sync.flip + 35, 20);
  const subtitleY = interpolate(frame, [sync.flip + 35, sync.flip + 55], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        opacity,
      }}
    >
      {/* ── Scene label ── */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontSize: 26,
          fontWeight: 700,
          color: "#9CA3AF",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: labelOpacity,
        }}
      >
        Step 1 — Tokenization
      </div>

      {/* ── Full word (pre-split) ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 108,
          fontWeight: 900,
          color: "#111111",
          letterSpacing: "-0.03em",
          whiteSpace: "nowrap",
          opacity: fullWordOpacity,
        }}
      >
        Understanding
      </div>

      {/* ── Three token pills (post-split) ── */}
      {SUBWORDS.map((token, i) => {
        const spreadProgress = progress(
          frame,
          sync.split,
          sync.split + 28,
          easeSpring,
        );

        const currentLeft = interpolate(
          spreadProgress,
          [0, 1],
          [PILL_START_LEFT, PILL_FINAL_LEFT[i]],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const flipP = progress(
          frame,
          sync.flip + i * 9,
          sync.flip + i * 9 + 22,
        );

        return (
          <div
            key={token.word}
            style={{
              position: "absolute",
              top: PILL_TOP,
              left: currentLeft,
              opacity: pillsEntranceOpacity,
            }}
          >
            <TokenPill
              word={token.word}
              id={token.id}
              flipProgress={flipP}
            />
          </div>
        );
      })}

      {/* ── Subtitle after flip ── */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 36,
          color: "#6B7280",
          fontWeight: 500,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
        }}
      >
        The model never reads text. It reads numbers.
      </div>
    </AbsoluteFill>
  );
};
