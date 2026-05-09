import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COT_OUTPUT_TOKENS, COT_REASONING_TOKENS, LOCAL_SYNC_TECH } from "../data/beats-technical";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const ChainOfThoughtScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.chainOfThought;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  // Task input
  const taskOpacity = fadeIn(frame, sync.task, 18);
  const taskY = interpolate(frame, [sync.task, sync.task + 18], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow: task → reasoning
  const arrow1Opacity = fadeIn(frame, sync.task + 20, 15);

  // Reasoning tokens (muted)
  const captionOpacity = fadeIn(frame, sync.output + 20, 20);

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
        5 — Chain of Thought
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 40,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        Intermediate reasoning tokens before the final answer — elicited by instructions.
      </div>

      {/* ── Flow: task → reasoning → output ── */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: 1500,
        }}
      >
        {/* Task + system prompt */}
        <div
          style={{
            opacity: taskOpacity,
            transform: `translateY(${taskY}px)`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#6D28D9",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            System Prompt
          </div>
          <div
            style={{
              background: "#EDE9FE",
              border: "2px solid #A78BFA",
              borderRadius: 12,
              padding: "18px 24px",
              fontSize: 20,
              fontFamily: "monospace",
              color: "#4C1D95",
              maxWidth: 300,
            }}
          >
            "Think step by step"
          </div>
        </div>

        {/* Arrow 1 */}
        <div
          style={{
            fontSize: 36,
            color: "#9CA3AF",
            padding: "0 20px",
            opacity: arrow1Opacity,
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* Reasoning tokens */}
        <div
          style={{
            flex: 1,
            opacity: fadeIn(frame, sync.reasoning, 18),
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#9CA3AF",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Reasoning tokens (working memory)
          </div>
          <div
            style={{
              background: "#F9FAFB",
              border: "2px solid #E5E7EB",
              borderRadius: 12,
              padding: "18px 24px",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {COT_REASONING_TOKENS.map((token, i) => {
              const tStart = sync.reasoning + i * 8;
              const tP = progress(frame, tStart, tStart + 12);
              return (
                <div
                  key={`cot-${token}-${i}`}
                  style={{
                    background: "#F3F4F6",
                    border: "1.5px solid #D1D5DB",
                    borderRadius: 999,
                    padding: "6px 16px",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#9CA3AF",
                    opacity: interpolate(tP, [0, 1], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  {token}
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrow 2 */}
        <div
          style={{
            fontSize: 36,
            color: "#9CA3AF",
            padding: "0 20px",
            opacity: fadeIn(frame, sync.reasoning + 30, 15),
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* Final output */}
        <div
          style={{
            flexShrink: 0,
            opacity: fadeIn(frame, sync.output, 18),
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#059669",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Final Answer
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            {COT_OUTPUT_TOKENS.map((token, i) => {
              const tStart = sync.output + i * 10;
              const tP = progress(frame, tStart, tStart + 14);
              return (
                <div
                  key={`out-${token}-${i}`}
                  style={{
                    background: "#D1FAE5",
                    border: "2px solid #34D399",
                    borderRadius: 999,
                    padding: "10px 22px",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#065F46",
                    opacity: interpolate(tP, [0, 1], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    transform: `translateY(${interpolate(tP, [0, 1], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
                  }}
                >
                  {token}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Caption ── */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
        }}
      >
        CoT is not self-triggered by task complexity — it's elicited by explicit instructions or baked in via RLHF.
      </div>
    </AbsoluteFill>
  );
};
