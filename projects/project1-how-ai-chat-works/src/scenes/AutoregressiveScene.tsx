import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

type AutoregressiveSceneProps = {
  stepLabel: string;
  outputTokens: readonly string[];
  tokenStagger: number;
  sync: {
    fadeIn: number;
    formula: number;
    tokens: number;
    caption?: number;
  };
};

export const AutoregressiveScene: React.FC<AutoregressiveSceneProps> = ({
  stepLabel,
  outputTokens,
  tokenStagger,
  sync,
}) => {
  const frame = useCurrentFrame();

  // Last scene — no hard fadeOut; use plain fadeIn for entrance
  const sceneOpacityVal = sceneOpacity(frame, sync.fadeIn, 9999, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);
  const formulaOpacity = fadeIn(frame, sync.formula, 22);
  const formulaY = interpolate(
    frame,
    [sync.formula, sync.formula + 22],
    [18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const boxOpacity = fadeIn(frame, sync.tokens - 15, 18);
  const captionStart = sync.caption ?? sync.tokens + outputTokens.length * tokenStagger + 10;
  const captionOpacity = fadeIn(frame, captionStart, 22);

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", opacity: sceneOpacityVal }}>
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
        {stepLabel}
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 52,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        One token at a time.
      </div>

      {/* ── Probability formula ── */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "monospace",
          fontSize: 38,
          fontWeight: 600,
          color: "#374151",
          letterSpacing: "0.02em",
          opacity: formulaOpacity,
          transform: `translateY(${formulaY}px)`,
        }}
      >
        P(token&#8345; | token&#8321; , … , token&#8345;&#8331;&#8321; , context)
      </div>

      {/* ── Response area ── */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1100,
          minHeight: 130,
          background: "#F9FAFB",
          border: "2px solid #E5E7EB",
          borderRadius: 18,
          padding: "32px 40px",
          opacity: boxOpacity,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignContent: "flex-start",
        }}
      >
        {outputTokens.map((token, i) => {
          const tokenStart = sync.tokens + i * tokenStagger;
          const tokenP = progress(frame, tokenStart, tokenStart + 12);

          const tokenOpacity = interpolate(tokenP, [0, 0.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const tokenY = interpolate(tokenP, [0, 1], [10, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`${token}-${i}`}
              style={{
                background: "#E8F0FE",
                border: "1.5px solid #3B6FD4",
                borderRadius: 999,
                padding: "8px 22px",
                fontSize: 26,
                fontWeight: 700,
                color: "#3B6FD4",
                opacity: tokenOpacity,
                transform: `translateY(${tokenY}px)`,
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
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
        }}
      >
        The whole system is a loop over token prediction, grounded by a carefully constructed context string.
      </div>
    </AbsoluteFill>
  );
};
