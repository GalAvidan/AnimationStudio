import { interpolate } from "remotion";
import { easeOut } from "../utils/animation";

type ContextBlockProps = {
  label: string;
  /** Short plain-language explanation shown below the label. */
  description: string;
  /** Border and label text color. */
  color: string;
  /** Background fill. */
  bg: string;
  /** 0→1 entrance progress. */
  entranceProgress: number;
  /** When true, the block lands with a subtle emphasis pulse. */
  isLast?: boolean;
  /** 0→1 emphasis pulse progress (only used when isLast). */
  emphasisProgress?: number;
};

export const ContextBlock: React.FC<ContextBlockProps> = ({
  label,
  description,
  color,
  bg,
  entranceProgress,
  isLast,
  emphasisProgress = 0,
}) => {
  const x = interpolate(entranceProgress, [0, 1], [-60, 0], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(entranceProgress, [0, 0.35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Emphasis: subtle scale + border glow when this is "Your Message"
  const emphasisScale = isLast
    ? interpolate(emphasisProgress, [0, 0.3, 0.6, 1], [1, 1.04, 1.02, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const borderWidth = isLast
    ? interpolate(emphasisProgress, [0, 0.3, 1], [2, 3, 2], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 2;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px) scale(${emphasisScale})`,
        background: bg,
        border: `${borderWidth}px solid ${color}`,
        borderRadius: 10,
        padding: "18px 28px",
        minWidth: 240,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 18,
          fontWeight: 500,
          color,
          opacity: 0.75,
          lineHeight: 1.4,
          marginTop: 4,
        }}
      >
        {description}
      </span>
    </div>
  );
};
