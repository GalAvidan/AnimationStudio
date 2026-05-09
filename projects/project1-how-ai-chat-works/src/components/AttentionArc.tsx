/** SVG curved arc drawn between two token positions to represent attention weight. */

type AttentionArcProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Visual weight 0–1 (controls opacity and stroke width). */
  weight: number;
  /** 0→1 draw-in progress. */
  progress: number;
};

export const AttentionArc: React.FC<AttentionArcProps> = ({
  x1,
  y1,
  x2,
  y2,
  weight,
  progress,
}) => {
  // Control point arcs BELOW the token row
  const cx = (x1 + x2) / 2;
  const span = Math.abs(x2 - x1);
  const cy = Math.max(y1, y2) + 60 + span * 0.18;

  const d = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

  const opacity = weight * progress * 0.85;
  const strokeWidth = 1.5 + weight * 3.5;

  // Amber hue, brightness scales with weight
  const lightness = Math.round(55 + (1 - weight) * 20);
  const stroke = `hsl(38, 90%, ${lightness}%)`;

  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
      opacity={opacity}
    />
  );
};
