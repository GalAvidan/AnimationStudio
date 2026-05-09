import { interpolate } from "remotion";
import type { CSSProperties } from "react";

type ChatInputProps = {
  /** Current global frame of the scene (useCurrentFrame() result). */
  frame: number;
  /** Frame at which the input appears. */
  startFrame: number;
  /** Frame at which the send button activates / pulses. */
  sendFrame: number;
  style?: CSSProperties;
};

const QUESTION = "How does a chat AI work?";

export const ChatInput: React.FC<ChatInputProps> = ({
  frame,
  startFrame,
  sendFrame,
  style,
}) => {
  const containerOpacity = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Type characters between startFrame+5 and sendFrame-5
  const charsVisible = Math.floor(
    interpolate(frame, [startFrame + 5, sendFrame - 5], [0, QUESTION.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const displayText = QUESTION.slice(0, charsVisible);
  const showCursor = frame < sendFrame;

  // Cursor blinks every 15 frames
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  const isReady = frame >= sendFrame;
  const sendBg = isReady ? "#3B6FD4" : "#E5E7EB";
  const sendColor = isReady ? "#FFFFFF" : "#9CA3AF";

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "#F9FAFB",
        border: "2px solid #E5E7EB",
        borderRadius: 16,
        padding: "24px 28px",
        width: 720,
        ...style,
      }}
    >
      {/* Text area */}
      <div
        style={{
          flex: 1,
          fontSize: 32,
          color: "#111111",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          minHeight: 40,
          display: "flex",
          alignItems: "center",
        }}
      >
        {displayText}
        {showCursor && (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 36,
              background: "#3B6FD4",
              marginLeft: 3,
              opacity: cursorVisible ? 1 : 0,
            }}
          />
        )}
      </div>

      {/* Send button */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: sendBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: sendColor,
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          ↑
        </span>
      </div>
    </div>
  );
};
