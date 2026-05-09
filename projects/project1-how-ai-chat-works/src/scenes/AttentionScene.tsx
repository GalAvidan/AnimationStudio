import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AttentionArc } from "../components/AttentionArc";
import {
  ARC_STAGGER,
  ATTENTION_PAIRS,
  ATTENTION_TOKEN_X,
  ATTENTION_TOKEN_Y,
  ATTENTION_TOKENS,
  LOCAL_SYNC,
} from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

// Token pill dimensions for the attention row
const TOKEN_W = 120;
const TOKEN_H = 50;

export const AttentionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.attention;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);

  // Token row fades in before arcs
  const tokensOpacity = fadeIn(frame, 5, 20);

  // Caption fades in after pattern is formed
  const captionOpacity = fadeIn(frame, sync.pattern + 15, 20);
  const captionY = interpolate(
    frame,
    [sync.pattern + 15, sync.pattern + 35],
    [14, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
        Step 4 — Attention
      </div>

      {/* ── SVG arc layer (below token pills) ── */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        viewBox="0 0 1920 1080"
      >
        {ATTENTION_PAIRS.map((pair, i) => {
          const arcStart = sync.lines + i * ARC_STAGGER;
          const arcProgress = progress(frame, arcStart, arcStart + 20);

          return (
            <AttentionArc
              key={`arc-${i}`}
              x1={ATTENTION_TOKEN_X[pair.from]}
              y1={ATTENTION_TOKEN_Y + TOKEN_H / 2}
              x2={ATTENTION_TOKEN_X[pair.to]}
              y2={ATTENTION_TOKEN_Y + TOKEN_H / 2}
              weight={pair.weight}
              progress={arcProgress}
            />
          );
        })}
      </svg>

      {/* ── Token row ── */}
      {ATTENTION_TOKENS.map((token, i) => (
        <div
          key={token}
          style={{
            position: "absolute",
            top: ATTENTION_TOKEN_Y,
            left: ATTENTION_TOKEN_X[i] - TOKEN_W / 2,
            width: TOKEN_W,
            height: TOKEN_H,
            background: "#E8F0FE",
            border: "2px solid #3B6FD4",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: tokensOpacity,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#1E3A8A",
              whiteSpace: "nowrap",
            }}
          >
            {token}
          </span>
        </div>
      ))}

      {/* ── Caption ── */}
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
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
        }}
      >
        Tokens that relate to each other pull together. A pattern forms.
      </div>
    </AbsoluteFill>
  );
};
