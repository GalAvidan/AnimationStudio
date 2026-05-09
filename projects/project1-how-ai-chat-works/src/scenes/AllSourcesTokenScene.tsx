import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC, SOURCE_TOKEN_ROWS } from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

const ROW_TOP = 260;
const ROW_GAP = 150;
const TOKEN_W = 104;
const TOKEN_H = 56;

const tokenIdFor = (rowIndex: number, tokenIndex: number) => {
  return 1200 + rowIndex * 700 + tokenIndex * 137;
};

export const AllSourcesTokenScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.allSourcesTokens;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 12, 18);
  const mergeProgress = progress(frame, sync.merge, sync.merge + 34);
  const captionOpacity = fadeIn(frame, sync.merge + 24, 18);

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", opacity }}>
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
        Step 2 — Everything Becomes Tokens
      </div>

      <div
        style={{
          position: "absolute",
          top: 165,
          left: 120,
          right: 120,
          fontSize: 48,
          fontWeight: 850,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        Not just your words — every visible source is tokenized.
      </div>

      {SOURCE_TOKEN_ROWS.map((row, rowIndex) => {
        const rowStart = sync.rowsStart + rowIndex * 18;
        const rowOpacity = fadeIn(frame, rowStart, 14);
        const rowY = ROW_TOP + rowIndex * ROW_GAP;
        const targetY = 710;
        const targetX = 170 + rowIndex * 560;
        const sourceFade = interpolate(mergeProgress, [0, 0.55, 1], [1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const tokenGroupX = interpolate(mergeProgress, [0, 1], [680, targetX], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const tokenGroupY = interpolate(mergeProgress, [0, 1], [rowY + 38, targetY], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const tokenScale = interpolate(mergeProgress, [0, 1], [1, 0.52], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div key={row.label} style={{ opacity: rowOpacity }}>
            <div
              style={{
                position: "absolute",
                top: rowY,
                left: 120,
                width: 430,
                opacity: sourceFade,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: row.color,
                  marginBottom: 8,
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "#374151",
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 12,
                  padding: "16px 18px",
                }}
              >
                {row.text}
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: rowY + 48,
                left: 575,
                width: 84,
                textAlign: "center",
                opacity: sourceFade * fadeIn(frame, rowStart + 16, 12),
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: row.color,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                tokenize
              </div>
              <div
                style={{
                  height: 2,
                  background: row.color,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: -1,
                    top: -5,
                    width: 0,
                    height: 0,
                    borderTop: "6px solid transparent",
                    borderBottom: "6px solid transparent",
                    borderLeft: `9px solid ${row.color}`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                top: tokenGroupY,
                left: tokenGroupX,
                display: "flex",
                gap: 10,
                transform: `scale(${tokenScale})`,
                transformOrigin: "left center",
              }}
            >
              {row.tokens.map((token, tokenIndex) => {
                const tokenOpacity = fadeIn(frame, rowStart + 24 + tokenIndex * 5, 8);
                const tokenY = interpolate(tokenOpacity, [0, 1], [12, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });

                return (
                  <div
                    key={`${row.label}-${token}`}
                    style={{
                      width: TOKEN_W,
                      height: TOKEN_H,
                      borderRadius: 9,
                      border: `2px solid ${row.color}`,
                      background: row.bg,
                      color: row.color,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      fontWeight: 800,
                      opacity: tokenOpacity,
                      transform: `translateY(${tokenY}px)`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1.05 }}>{token}</span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        opacity: 0.7,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      id {tokenIdFor(rowIndex, tokenIndex)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: 122,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 34,
          color: "#6B7280",
          fontWeight: 500,
          opacity: captionOpacity,
        }}
      >
        Then the token streams are packed into one context window.
      </div>
    </AbsoluteFill>
  );
};
