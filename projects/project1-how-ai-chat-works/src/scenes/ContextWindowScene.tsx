import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ContextBlock } from "../components/ContextBlock";
import {
  CONTEXT_BLOCKS,
  CONTEXT_BLOCK_STAGGER,
  LOCAL_SYNC,
} from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const ContextWindowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.contextWindow;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);

  // Caption below the blocks
  const captionOpacity = fadeIn(frame, sync.starts + CONTEXT_BLOCK_STAGGER * 2 + 20, 20);
  const captionY = interpolate(
    frame,
    [sync.starts + CONTEXT_BLOCK_STAGGER * 2 + 20, sync.starts + CONTEXT_BLOCK_STAGGER * 2 + 40],
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
        Step 3 — Context Window
      </div>

      {/* ── Section title ── */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          right: 120,
          fontSize: 52,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: labelOpacity,
        }}
      >
        Everything the model can see — assembled into one flat sequence.
      </div>

      {/* ── Context blocks row ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 20,
          padding: "0 120px",
        }}
      >
        {CONTEXT_BLOCKS.map((block, i) => {
          const entranceStart = sync.starts + i * CONTEXT_BLOCK_STAGGER;
          const entranceProgress = progress(frame, entranceStart, entranceStart + 25);

          const isLast = i === CONTEXT_BLOCKS.length - 1;
          const emphasisProgress = isLast
            ? progress(frame, sync.messageLands, sync.messageLands + 20)
            : 0;

          return (
            <ContextBlock
              key={block.label}
              label={block.label}
              description={block.description}
              color={block.color}
              bg={block.bg}
              entranceProgress={entranceProgress}
              isLast={isLast}
              emphasisProgress={emphasisProgress}
            />
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
          fontSize: 34,
          color: "#6B7280",
          fontWeight: 500,
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
        }}
      >
        One input. No hidden state. No separate database.
      </div>
    </AbsoluteFill>
  );
};
