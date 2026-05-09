import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_TECH, MEMORY_ROW_STAGGER, MEMORY_TIERS } from "../data/beats-technical";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const MemoryTiersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.memoryTiers;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const tableHeaderOpacity = fadeIn(frame, sync.table, 18);
  const captionOpacity = fadeIn(frame, sync.rows + MEMORY_TIERS.length * MEMORY_ROW_STAGGER + 15, 20);

  const TIER_COLORS: Record<string, { color: string; bg: string }> = {
    "In-context": { color: "#3B6FD4", bg: "#EEF2FF" },
    "Session":    { color: "#047857", bg: "#D1FAE5" },
    "User":       { color: "#B45309", bg: "#FEF3C7" },
    "Repo":       { color: "#6D28D9", bg: "#EDE9FE" },
  };

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
        8 — Memory Tiers
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
        Four tiers. All implemented as files. Loaded into context at turn start.
      </div>

      {/* ── Table ── */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1300,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr 1fr",
            gap: 12,
            marginBottom: 8,
            opacity: tableHeaderOpacity,
          }}
        >
          {["Tier", "Scope", "Lifetime"].map((h) => (
            <div
              key={h}
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#9CA3AF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0 20px",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {MEMORY_TIERS.map((row, i) => {
          const rowStart = sync.rows + i * MEMORY_ROW_STAGGER;
          const rowP = progress(frame, rowStart, rowStart + 18);
          const rowOpacity = interpolate(rowP, [0, 0.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const rowY = interpolate(rowP, [0, 1], [14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const { color, bg } = TIER_COLORS[row.tier] ?? { color: "#374151", bg: "#F9FAFB" };

          return (
            <div
              key={row.tier}
              style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr 1fr",
                gap: 12,
                marginBottom: 10,
                opacity: rowOpacity,
                transform: `translateY(${rowY}px)`,
              }}
            >
              <div
                style={{
                  background: bg,
                  border: `2px solid ${color}`,
                  borderRadius: 10,
                  padding: "18px 20px",
                  fontSize: 22,
                  fontWeight: 800,
                  color,
                }}
              >
                {row.tier}
              </div>
              <div
                style={{
                  background: "#F9FAFB",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "18px 20px",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                {row.scope}
              </div>
              <div
                style={{
                  background: "#F9FAFB",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "18px 20px",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#374151",
                }}
              >
                {row.lifetime}
              </div>
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
          fontSize: 28,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
        }}
      >
        All tiers are just files. The scope determines where the file lives, not how it's accessed.
      </div>
    </AbsoluteFill>
  );
};
