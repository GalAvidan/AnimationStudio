import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BPE_EXAMPLE, LOCAL_SYNC_TECH } from "../data/beats-technical";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const TokenizationDetailScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.tokenization;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  // Stage 1: original word fades in
  const wordOpacity = fadeIn(frame, 15, 20);

  // Stage 2: word splits → BPE pills
  const splitP = progress(frame, sync.split, sync.split + 20);
  const bpeOpacity = interpolate(splitP, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stage 3: BPE pills flip to integer IDs
  const flipP = progress(frame, sync.ids, sync.ids + 22);
  const flipAngle = interpolate(flipP, [0, 0.5], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showIds = flipP > 0.5;
  const idOpacity = interpolate(flipP, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = fadeIn(frame, sync.ids + 30, 20);

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", opacity }}>
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
        1 — Tokenization
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 44,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        Input text → BPE sub-word tokens → integer IDs
      </div>

      {/* ── Stage 1: Original word ── */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 72,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: wordOpacity * (1 - splitP),
          transform: `scale(${1 - splitP * 0.2})`,
        }}
      >
        {BPE_EXAMPLE.word}
      </div>

      {/* ── Stage 2: BPE Pills ── */}
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          opacity: bpeOpacity * (showIds ? 0 : 1),
        }}
      >
        {BPE_EXAMPLE.tokens.map((token, i) => {
          const pillDelay = sync.split + i * 8;
          const pillP = progress(frame, pillDelay, pillDelay + 16);
          const pillY = interpolate(pillP, [0, 1], [-16, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`bpe-${token}`}
              style={{
                background: "#E8F0FE",
                border: "2px solid #3B6FD4",
                borderRadius: 999,
                padding: "18px 40px",
                fontSize: 40,
                fontWeight: 700,
                color: "#3B6FD4",
                transform: `translateY(${pillY}px)`,
              }}
            >
              {token}
            </div>
          );
        })}
      </div>

      {/* ── Stage 3: Integer ID cards ── */}
      <div
        style={{
          position: "absolute",
          top: "43%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          opacity: showIds ? idOpacity : 0,
        }}
      >
        {BPE_EXAMPLE.ids.map((id) => (
          <div
            key={`id-${id}`}
            style={{
              background: "#F3F0FF",
              border: "2px solid #6B40C4",
              borderRadius: 14,
              padding: "18px 48px",
              fontSize: 48,
              fontWeight: 800,
              fontFamily: "monospace",
              color: "#6B40C4",
              transform: `rotateY(${showIds ? 0 : flipAngle}deg)`,
            }}
          >
            {id}
          </div>
        ))}
      </div>

      {/* ── Caption ── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
        }}
      >
        The model operates entirely on integer sequences. Vocabulary: ~100k entries.
      </div>
    </AbsoluteFill>
  );
};
