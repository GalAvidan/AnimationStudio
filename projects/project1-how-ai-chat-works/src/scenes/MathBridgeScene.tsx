import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC, PROBABILITY_BARS } from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const MathBridgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.mathBridge;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 20, 18);
  const chosenOpacity = fadeIn(frame, sync.choice, 12);
  const captionOpacity = fadeIn(frame, sync.choice + 18, 18);

  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        opacity,
      }}
    >
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
        Step 5 — Score The Next Token
      </div>

      <div
        style={{
          position: "absolute",
          top: 210,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 52,
          fontWeight: 850,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        From the attention pattern, math scores the next possible pieces.
      </div>

      <div
        style={{
          position: "absolute",
          top: 430,
          left: "50%",
          transform: "translateX(-50%)",
          width: 980,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {PROBABILITY_BARS.map((bar, index) => {
          const barProgress = progress(frame, sync.bars + index * 8, sync.bars + index * 8 + 22);
          const width = interpolate(barProgress, [0, 1], [0, bar.score], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const isChosen = bar.token === "math.";

          return (
            <div
              key={bar.token}
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 70px",
                alignItems: "center",
                gap: 18,
                opacity: fadeIn(frame, sync.bars + index * 8, 10),
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 750,
                  color: isChosen ? "#15803D" : "#374151",
                  textAlign: "right",
                }}
              >
                {bar.token}
              </div>
              <div
                style={{
                  height: 34,
                  borderRadius: 999,
                  background: "#F3F4F6",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                }}
              >
                <div
                  style={{
                    width: `${width}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: isChosen ? "#16A34A" : "#93C5FD",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: isChosen ? "#15803D" : "#9CA3AF",
                }}
              >
                {bar.score}%
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: 725,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: chosenOpacity,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 210,
            height: 64,
            borderRadius: 14,
            background: "#F0FDF4",
            border: "2px solid #16A34A",
            color: "#15803D",
            fontSize: 30,
            fontWeight: 850,
          }}
        >
          choose "math."
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 34,
          color: "#6B7280",
          fontWeight: 500,
          opacity: captionOpacity,
        }}
      >
        The chosen piece becomes the next output token.
      </div>
    </AbsoluteFill>
  );
};
