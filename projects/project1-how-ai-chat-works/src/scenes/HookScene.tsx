import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ChatInput } from "../components/ChatInput";
import { LOCAL_SYNC } from "../data/beats";
import { easeSpring, fadeIn, fadeOut, progress } from "../utils/animation";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC.hook;

  const opacity = Math.min(fadeIn(frame, 0, 18), fadeOut(frame, sync.fadeOut, 18));

  const titleOpacity = fadeIn(frame, 5, 22);
  const titleY = interpolate(frame, [5, 28], [22, 0], {
    easing: easeSpring,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Send button pulse: scale pops briefly when send is pressed
  const sendPulseProgress = progress(frame, sync.sendPressed, sync.sendPressed + 16);
  const sendScale = interpolate(
    sendPulseProgress,
    [0, 0.35, 0.65, 1],
    [1, 1.1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // After send, the chat input fades out
  const inputOpacity = interpolate(
    frame,
    [sync.sendPressed + 10, sync.sendPressed + 40],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "It's math." reveal after send
  const mathOpacity = interpolate(
    frame,
    [sync.sendPressed + 20, sync.sendPressed + 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const mathY = interpolate(
    frame,
    [sync.sendPressed + 20, sync.sendPressed + 45],
    [18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        opacity,
      }}
    >
      {/* Scene headline */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#6B7280",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          What actually happens when you hit Send?
        </div>
      </div>

      {/* Chat input — fades out after send */}
      <div
        style={{
          opacity: inputOpacity,
          transform: `scale(${sendScale})`,
        }}
      >
        <ChatInput
          frame={frame}
          startFrame={25}
          sendFrame={sync.sendPressed}
        />
      </div>

      {/* "It's math." reveal */}
      <div
        style={{
          position: "absolute",
          opacity: mathOpacity,
          transform: `translateY(${mathY}px)`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#111111",
            letterSpacing: "-0.03em",
          }}
        >
          It's math.
        </span>
        <div
          style={{
            fontSize: 28,
            color: "#9CA3AF",
            fontWeight: 400,
            marginTop: 16,
          }}
        >
          No magic. Just a process.
        </div>
      </div>
    </AbsoluteFill>
  );
};
