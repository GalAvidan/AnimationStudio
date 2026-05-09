import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_TECH, MATRIX_SIZE_TECH } from "../data/beats-technical";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

const CELL = 76;
const GAP = 5;
const TOKENS_8 = ["You", "type", "a", "message", "and", "hit", "Send", "↓"];

export const CausalAttentionMatrixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.causalAttention;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const gridOpacity = fadeIn(frame, sync.gridIn, 18);
  const captionOpacity = fadeIn(frame, sync.mask + 40, 20);

  const n = MATRIX_SIZE_TECH;

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
        3 — Causal Attention
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 40,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        Token at position <em>i</em> attends only to positions ≤ <em>i</em>. Upper triangle → −∞.
      </div>

      {/* ── Attention matrix ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -38%)",
          opacity: gridOpacity,
        }}
      >
        {/* Column labels */}
        <div style={{ display: "flex", marginLeft: CELL + GAP + 4, marginBottom: 4, gap: GAP }}>
          {TOKENS_8.map((t) => (
            <div
              key={`col-${t}`}
              style={{
                width: CELL,
                textAlign: "center",
                fontSize: 15,
                fontWeight: 600,
                color: "#9CA3AF",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: n }).map((_, row) => (
          <div key={`row-${row}`} style={{ display: "flex", gap: GAP, marginBottom: GAP }}>
            {/* Row label */}
            <div
              style={{
                width: CELL,
                height: CELL,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 8,
                fontSize: 15,
                fontWeight: 600,
                color: "#9CA3AF",
                flexShrink: 0,
              }}
            >
              {TOKENS_8[row]}
            </div>

            {/* Cells */}
            {Array.from({ length: n }).map((_, col) => {
              const isLower = col <= row;
              const isUpper = col > row;

              // Lower triangle lights up in a sweep
              const lightDelay = sync.lights + (row * n + col) * 2;
              const cellP = isLower
                ? progress(frame, lightDelay, lightDelay + 14)
                : 0;

              // Use a varying weight to simulate a heatmap
              const weight = isLower
                ? Math.max(0.15, 1 - (row - col) * 0.12)
                : 0;
              const bgAlpha = interpolate(cellP, [0, 1], [0.06, weight * 0.9], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              // Upper triangle: explicit gray after mask sync
              const maskP = isUpper ? progress(frame, sync.mask, sync.mask + 20) : 0;
              const upperAlpha = interpolate(maskP, [0, 1], [0, 0.12], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={`cell-${row}-${col}`}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 6,
                    background: isLower
                      ? `rgba(59, 111, 212, ${bgAlpha})`
                      : `rgba(156, 163, 175, ${upperAlpha + 0.1})`,
                    border: isLower
                      ? "1px solid rgba(59,111,212,0.15)"
                      : "1px solid rgba(229,231,235,0.8)",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isUpper && maskP > 0.5 && (
                    <span
                      style={{
                        fontSize: 14,
                        color: "#D1D5DB",
                        fontFamily: "monospace",
                        fontWeight: 700,
                        opacity: interpolate(maskP, [0.5, 1], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        }),
                      }}
                    >
                      −∞
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Caption ── */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
        }}
      >
        Intent is not classified — it's emergent from the directed attention pattern over all prior tokens.
      </div>
    </AbsoluteFill>
  );
};
