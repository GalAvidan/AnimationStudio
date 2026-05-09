import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_TECH } from "../data/beats-technical";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

const SKILL_CONTENT = `---
name: code-review
description: Review code for correctness
applyTo: "**/*.ts"
---

Always check for:
- Type safety
- Edge cases
- Security issues`;

export const SkillsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.skills;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const fileP  = progress(frame, sync.file,  sync.file + 22);
  const arrowP = progress(frame, sync.arrow, sync.arrow + 22);

  const fileOpacity = interpolate(fileP, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fileX = interpolate(fileP, [0, 1], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrowOpacity = interpolate(arrowP, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // System prompt block receiving the skill
  const sysBlockP = progress(frame, sync.arrow + 10, sync.arrow + 32);
  const sysOpacity = interpolate(sysBlockP, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sysY = interpolate(sysBlockP, [0, 1], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const captionOpacity = fadeIn(frame, sync.arrow + 50, 20);

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
        7 — Skills as Prompt Injection
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
        Skill files are text injected into the system prompt. No fine-tuning. No LoRA.
      </div>

      {/* ── Diagram ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -35%)",
          display: "flex",
          alignItems: "center",
          gap: 48,
          width: 1300,
        }}
      >
        {/* Skill file card */}
        <div
          style={{
            flex: 1,
            opacity: fileOpacity,
            transform: `translateX(${fileX}px)`,
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
            Skill file
          </div>
          <pre
            style={{
              background: "#EDE9FE",
              border: "2px solid #A78BFA",
              borderRadius: 12,
              padding: "24px 28px",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#4C1D95",
              margin: 0,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
            }}
          >
            {SKILL_CONTENT}
          </pre>
        </div>

        {/* Flow arrow */}
        <div
          style={{
            fontSize: 48,
            color: "#9CA3AF",
            opacity: arrowOpacity,
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* System Prompt block */}
        <div
          style={{
            flex: 1,
            opacity: sysOpacity,
            transform: `translateY(${sysY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#475569",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            System Prompt (in context)
          </div>
          <div
            style={{
              background: "#F1F5F9",
              border: "2.5px solid #94A3B8",
              borderRadius: 12,
              padding: "28px 32px",
              fontSize: 20,
              color: "#1E293B",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10, color: "#475569" }}>
              You are a helpful AI assistant.
            </div>
            <div
              style={{
                background: "#EDE9FE",
                border: "1.5px solid #A78BFA",
                borderRadius: 8,
                padding: "12px 16px",
                fontSize: 17,
                color: "#4C1D95",
                fontFamily: "monospace",
              }}
            >
              {"[skill: code-review injected here]"}
            </div>
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
        Behavioral shaping via in-context text at inference time. No weights updated.
      </div>
    </AbsoluteFill>
  );
};
