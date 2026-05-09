import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_DEV, MATRIX_SIZE_DEV } from "../data/beats-dev";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

const CELL = 90; // px per grid cell
const GAP = 6;   // gap between cells

export const TransformerPassScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_DEV.transformerPass;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const gridOpacity = fadeIn(frame, sync.gridIn, 18);
  const captionOpacity = fadeIn(frame, sync.lights + 60, 20);

  const n = MATRIX_SIZE_DEV;
  const TOKENS = ["You", "type", "a", "question", "hit", "Send"];

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
        Step 2 — Transformer Forward Pass
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
        Causal mask: each token attends only to preceding tokens.
      </div>

      {/* ── Grid + token labels ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -40%)",
          opacity: gridOpacity,
        }}
      >
        {/* Column labels (top) */}
        <div
          style={{
            display: "flex",
            marginLeft: CELL + GAP + 4,
            marginBottom: 6,
            gap: GAP,
          }}
        >
          {TOKENS.map((t) => (
            <div
              key={`col-${t}`}
              style={{
                width: CELL,
                textAlign: "center",
                fontSize: 18,
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
          <div
            key={`row-${row}`}
            style={{ display: "flex", gap: GAP, marginBottom: GAP }}
          >
            {/* Row label */}
            <div
              style={{
                width: CELL,
                height: CELL,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: 10,
                fontSize: 18,
                fontWeight: 600,
                color: "#9CA3AF",
                flexShrink: 0,
              }}
            >
              {TOKENS[row]}
            </div>

            {/* Cells */}
            {Array.from({ length: n }).map((_, col) => {
              const isActive = col <= row; // lower triangle (including diagonal)
              // Each active cell in lower triangle lights up with stagger
              const lightDelay = sync.lights + (row * n + col) * 3;
              const cellP = isActive
                ? progress(frame, lightDelay, lightDelay + 18)
                : 0;

              const bgActive = interpolate(cellP, [0, 1], [0.08, 0.85], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={`cell-${row}-${col}`}
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: 8,
                    background: isActive
                      ? `rgba(59, 111, 212, ${bgActive})`
                      : "#F3F4F6",
                    border: isActive ? "1.5px solid rgba(59,111,212,0.2)" : "1.5px solid #E5E7EB",
                    flexShrink: 0,
                  }}
                />
              );
            })}
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
        Intent isn't extracted — it's emergent from directed attention over all prior context.
      </div>
    </AbsoluteFill>
  );
};
