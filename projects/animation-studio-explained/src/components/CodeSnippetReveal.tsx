import type { CSSProperties } from "react";
import { TERMINAL_BG, TERMINAL_TEXT, FONT_MONO } from "../data/theme";

type CodeSnippetRevealProps = {
  /** Lines of text to display, revealed one at a time. */
  lines: ReadonlyArray<string>;
  /** 0 → linesShown(=lines.length). Fractional values are floored. */
  linesShown: number;
  /** Visual style: terminal pane (dark) or plain mono (light). */
  variant?: "terminal" | "plain";
  width?: number;
  /** Optional title bar text (terminal variant only). */
  title?: string;
  /** Show a blinking caret after the last revealed line. */
  showCaret?: boolean;
  style?: CSSProperties;
  fontSize?: number;
};

export const CodeSnippetReveal: React.FC<CodeSnippetRevealProps> = ({
  lines,
  linesShown,
  variant = "terminal",
  width = 720,
  title,
  showCaret = false,
  style,
  fontSize = 18,
}) => {
  const visible = lines.slice(0, Math.max(0, Math.floor(linesShown)));
  const isTerminal = variant === "terminal";

  return (
    <div
      style={{
        width,
        background: isTerminal ? TERMINAL_BG : "#FFFFFF",
        color: isTerminal ? TERMINAL_TEXT : "#111111",
        border: isTerminal ? "none" : "1px solid #E5E7EB",
        borderRadius: 10,
        boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
        overflow: "hidden",
        fontFamily: FONT_MONO,
        ...style,
      }}
    >
      {isTerminal ? (
        <div
          style={{
            height: 32,
            background: "#0F0F0F",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 8,
            borderBottom: "1px solid #2A2A2A",
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: 5, background: "#FF6058" }} />
          <div style={{ width: 9, height: 9, borderRadius: 5, background: "#FFBC2E" }} />
          <div style={{ width: 9, height: 9, borderRadius: 5, background: "#28C940" }} />
          {title ? (
            <div style={{ marginLeft: 12, fontSize: 12, color: "#9CA3AF" }}>{title}</div>
          ) : null}
        </div>
      ) : null}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
        {visible.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize,
              lineHeight: 1.5,
              whiteSpace: "pre",
              fontFamily: FONT_MONO,
            }}
          >
            {line}
            {showCaret && i === visible.length - 1 ? (
              <span style={{ marginLeft: 4, opacity: 0.85 }}>▎</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
