import { interpolate } from "remotion";
import { easeOut } from "../utils/animation";

type PipelineStepProps = {
  label: string;
  /** Optional small descriptor shown below the label. */
  subtitle?: string;
  /** 0→1 entrance progress. */
  entranceProgress: number;
  /** When false, renders a connecting arrow to the right of the box. */
  isLast: boolean;
};

const BOX_W = 196;
const BOX_H = 96; // slightly taller to fit optional subtitle

export const PipelineStep: React.FC<PipelineStepProps> = ({
  label,
  subtitle,
  entranceProgress,
  isLast,
}) => {
  const opacity = interpolate(entranceProgress, [0, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(entranceProgress, [0, 1], [20, 0], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowOpacity = interpolate(entranceProgress, [0.6, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* Box */}
      <div
        style={{
          width: BOX_W,
          height: BOX_H,
          background: "#F0FDF4",
          border: "2px solid #16A34A",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 12px",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#15803D",
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </span>
        {subtitle && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "#16A34A",
              opacity: 0.75,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      {/* Arrow connecting to next step */}
      {!isLast && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: arrowOpacity,
            marginLeft: -1,
          }}
        >
          <div
            style={{
              width: 32,
              height: 2,
              background: "#16A34A",
            }}
          />
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: "10px solid #16A34A",
              marginLeft: -1,
            }}
          />
        </div>
      )}
    </div>
  );
};
