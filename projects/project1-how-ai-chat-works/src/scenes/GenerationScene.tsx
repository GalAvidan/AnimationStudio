import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import {
  LOCAL_SYNC,
  OUTPUT_TOKENS,
  TOKEN_GEN_STAGGER,
} from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const GenerationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.generation;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);

  // Response box fades in just before tokens start appearing
  const boxOpacity = fadeIn(frame, sync.starts - 15, 18);

  // Caption
  const captionOpacity = fadeIn(frame, sync.starts + OUTPUT_TOKENS.length * TOKEN_GEN_STAGGER + 10, 18);

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
        Step 6 — Generation
      </div>

      {/* ── Response area ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          minHeight: 160,
          background: "#F9FAFB",
          border: "2px solid #E5E7EB",
          borderRadius: 20,
          padding: "40px 48px",
          opacity: boxOpacity,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignContent: "flex-start",
        }}
      >
        {/* ── Output tokens appearing one-by-one ── */}
        {OUTPUT_TOKENS.map((token, i) => {
          const tokenStart = sync.starts + i * TOKEN_GEN_STAGGER;
          const tokenProgress = progress(frame, tokenStart, tokenStart + 12);

          const tokenOpacity = interpolate(tokenProgress, [0, 0.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const tokenY = interpolate(tokenProgress, [0, 1], [12, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`${token}-${i}`}
              style={{
                opacity: tokenOpacity,
                transform: `translateY(${tokenY}px)`,
                background: "#E8F0FE",
                border: "2px solid #3B6FD4",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 28,
                fontWeight: 700,
                color: "#1E3A8A",
              }}
            >
              {token}
            </div>
          );
        })}
      </div>

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
        }}
      >
        The same scoring loop repeats until the sentence is complete.
      </div>
    </AbsoluteFill>
  );
};
