import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_DEV } from "../data/beats-dev";
import { fadeIn, sceneOpacity } from "../utils/animation";

export const DevHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_DEV.hook;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 5, 22);
  const labelY = interpolate(frame, [5, 28], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = fadeIn(frame, 30, 25);
  const subY = interpolate(frame, [30, 55], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor blinks every 30 frames
  const cursorVisible = Math.floor(frame / 20) % 2 === 0;

  return (
    <AbsoluteFill
      style={{
        background: "#111111",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Terminal-style prompt ── */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          fontFamily: "monospace",
          color: "#F9FAFB",
          letterSpacing: "0.02em",
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span style={{ color: "#4ADE80" }}>$</span>
        <span> message → model</span>
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 56,
            background: "#4ADE80",
            marginLeft: 6,
            opacity: cursorVisible ? 1 : 0,
          }}
        />
      </div>

      {/* ── Sub-title ── */}
      <div
        style={{
          marginTop: 36,
          fontSize: 32,
          fontWeight: 500,
          color: "#9CA3AF",
          letterSpacing: "0.01em",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          fontFamily: "monospace",
        }}
      >
        here is what is actually executing
      </div>
    </AbsoluteFill>
  );
};
