import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ContextBlock } from "../components/ContextBlock";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

type ContextSegment = {
  readonly label: string;
  readonly description: string;
  readonly color: string;
  readonly bg: string;
};

type ContextAssemblySceneProps = {
  stepLabel: string;
  title: string;
  caption: string;
  blocks: readonly ContextSegment[];
  blockStagger: number;
  sync: { fadeIn: number; starts: number; fadeOut: number };
};

export const ContextAssemblyScene: React.FC<ContextAssemblySceneProps> = ({
  stepLabel,
  title,
  caption,
  blocks,
  blockStagger,
  sync,
}) => {
  const frame = useCurrentFrame();

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const lastBlockLocal = sync.starts + (blocks.length - 1) * blockStagger;
  const captionOpacity = fadeIn(frame, lastBlockLocal + 20, 20);
  const captionY = interpolate(
    frame,
    [lastBlockLocal + 20, lastBlockLocal + 40],
    [14, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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
        {stepLabel}
      </div>

      {/* ── Section title ── */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 120,
          right: 120,
          fontSize: 46,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        {title}
      </div>

      {/* ── Context blocks row ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-20%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 14,
          padding: "0 80px",
        }}
      >
        {blocks.map((block, i) => {
          const blockStart = sync.starts + i * blockStagger;
          const blockProgress = progress(frame, blockStart, blockStart + 22);

          const isLast = i === blocks.length - 1;
          const emphasisStart = sync.starts + (blocks.length - 1) * blockStagger + 5;
          const emphasisProgress = isLast
            ? progress(frame, emphasisStart, emphasisStart + 25)
            : 0;

          return (
            <ContextBlock
              key={block.label}
              label={block.label}
              description={block.description}
              color={block.color}
              bg={block.bg}
              entranceProgress={blockProgress}
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
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 32,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
        }}
      >
        {caption}
      </div>
    </AbsoluteFill>
  );
};
