import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DETOKENIZED_TEXT, LOCAL_SYNC, OUTPUT_TOKENS } from "../data/beats";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const DetokenizeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.detokenize;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const tokensOpacity = interpolate(progress(frame, sync.starts, sync.starts + 18), [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tokensLift = interpolate(progress(frame, sync.text, sync.text + 28), [0, 1], [0, -70], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tokensFade = interpolate(progress(frame, sync.text, sync.text + 28), [0, 1], [1, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = fadeIn(frame, sync.text + 8, 18);
  const textY = interpolate(textOpacity, [0, 1], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const captionOpacity = fadeIn(frame, sync.text + 38, 18);

  return (
    <AbsoluteFill style={{ background: "#FFFFFF", opacity }}>
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
        Step 7 — Back To Text
      </div>

      <div
        style={{
          position: "absolute",
          top: 210,
          left: 120,
          right: 120,
          fontSize: 48,
          fontWeight: 850,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: fadeIn(frame, 18, 18),
        }}
      >
        The output tokens are detokenized into words you can read.
      </div>

      <div
        style={{
          position: "absolute",
          top: 470,
          left: "50%",
          transform: `translateX(-50%) translateY(${tokensLift}px)`,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
          width: 1180,
          opacity: tokensOpacity * tokensFade,
        }}
      >
        {OUTPUT_TOKENS.map((token, index) => (
          <div
            key={`${token}-${index}`}
            style={{
              background: "#E8F0FE",
              border: "2px solid #3B6FD4",
              borderRadius: 8,
              padding: "10px 18px",
              fontSize: 30,
              fontWeight: 800,
              color: "#1E3A8A",
            }}
          >
            {token}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 560,
          left: "50%",
          transform: `translateX(-50%) translateY(${textY}px)`,
          width: 1320,
          minHeight: 118,
          borderRadius: 20,
          background: "#F9FAFB",
          border: "2px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 44px",
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontSize: 44,
            fontWeight: 750,
            color: "#111111",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          {DETOKENIZED_TEXT}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 34,
          color: "#6B7280",
          fontWeight: 500,
          opacity: captionOpacity,
        }}
      >
        That is the answer you see in the chat.
      </div>
    </AbsoluteFill>
  );
};
