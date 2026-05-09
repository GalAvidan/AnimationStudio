import type { CSSProperties } from "react";

type FlowArrowProps = {
  /** Arrow path as an SVG d-attribute. */
  d: string;
  /** 0 = invisible, 1 = fully drawn. Implemented via stroke-dashoffset. */
  drawProgress: number;
  color?: string;
  thickness?: number;
  /** Estimated path length used for the dash trick. Default 1200. */
  pathLength?: number;
  /** Optional label rendered along the midpoint. */
  label?: string;
  labelPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  style?: CSSProperties;
  dashed?: boolean;
};

export const FlowArrow: React.FC<FlowArrowProps> = ({
  d,
  drawProgress,
  color = "#1F7A85",
  thickness = 4,
  pathLength = 1200,
  label,
  labelPosition,
  width = 1920,
  height = 1080,
  style,
  dashed = false,
}) => {
  const dashOffset = pathLength * (1 - drawProgress);
  const labelOpacity = Math.max(0, (drawProgress - 0.6) * 2.5);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", ...style }}
    >
      <defs>
        <marker
          id={`arrowhead-${color.replace("#", "")}`}
          markerWidth="12"
          markerHeight="12"
          refX="9"
          refY="6"
          orient="auto"
        >
          <path d="M 0 0 L 12 6 L 0 12 z" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={dashed ? "10 8" : pathLength}
        strokeDashoffset={dashed ? 0 : dashOffset}
        markerEnd={`url(#arrowhead-${color.replace("#", "")})`}
        opacity={dashed ? drawProgress : 1}
      />
      {label && labelPosition ? (
        <g opacity={labelOpacity}>
          <rect
            x={labelPosition.x - 80}
            y={labelPosition.y - 18}
            width={160}
            height={36}
            rx={8}
            fill="#FFFFFF"
            stroke={color}
            strokeWidth={1.5}
          />
          <text
            x={labelPosition.x}
            y={labelPosition.y + 6}
            textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize={16}
            fontWeight={600}
            fill={color}
          >
            {label}
          </text>
        </g>
      ) : null}
    </svg>
  );
};
