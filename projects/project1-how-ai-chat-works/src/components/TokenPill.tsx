import { interpolate } from "remotion";
import type { CSSProperties } from "react";

type TokenPillProps = {
  word: string;
  id: number;
  /**
   * 0 = word face showing, 1 = number face showing.
   * The transition is a Y-axis card-flip effect.
   */
  flipProgress: number;
  style?: CSSProperties;
};

// Colors for the two faces
const WORD_BG     = "#E8F0FE";
const WORD_BORDER = "#3B6FD4";
const WORD_TEXT   = "#1E3A8A";

const ID_BG     = "#F3F0FF";
const ID_BORDER = "#6B40C4";
const ID_TEXT   = "#4C1D95";

const pillBase: CSSProperties = {
  width: 180,
  height: 80,
  borderRadius: 12,
  border: "2px solid",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  left: 0,
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
};

export const TokenPill: React.FC<TokenPillProps> = ({
  word,
  id,
  flipProgress,
  style,
}) => {
  // Simulate a card-flip: compress scaleX to 0 at midpoint then expand
  const scaleX = interpolate(
    flipProgress,
    [0, 0.45, 0.55, 1],
    [1, 0.05, 0.05, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Word face is visible in the first half
  const wordOpacity = interpolate(flipProgress, [0, 0.4, 0.5], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Number face is visible in the second half
  const idOpacity = interpolate(flipProgress, [0.5, 0.6, 1], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width: 180,
        height: 80,
        transform: `scaleX(${scaleX})`,
        ...style,
      }}
    >
      {/* Word face */}
      <div
        style={{
          ...pillBase,
          background: WORD_BG,
          borderColor: WORD_BORDER,
          opacity: wordOpacity,
        }}
      >
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: WORD_TEXT,
            letterSpacing: "-0.01em",
          }}
        >
          {word}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: WORD_BORDER,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: 2,
          }}
        >
          token
        </span>
      </div>

      {/* ID face */}
      <div
        style={{
          ...pillBase,
          background: ID_BG,
          borderColor: ID_BORDER,
          opacity: idOpacity,
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: ID_TEXT,
            letterSpacing: "-0.02em",
          }}
        >
          {id}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: ID_BORDER,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: 2,
          }}
        >
          id
        </span>
      </div>
    </div>
  );
};
