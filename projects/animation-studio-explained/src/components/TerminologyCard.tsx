import type { CSSProperties } from "react";
import { FONT_SANS, FONT_MONO, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";

type TerminologyCardProps = {
  term: string;
  definition: string;
  example: string;
  /** When true the example renders in monospace. */
  exampleMono?: boolean;
  accent?: string;
  width?: number;
  style?: CSSProperties;
};

export const TerminologyCard: React.FC<TerminologyCardProps> = ({
  term,
  definition,
  example,
  exampleMono = true,
  accent = "#2C5BA1",
  width = 720,
  style,
}) => {
  return (
    <div
      style={{
        width,
        background: "#FFFFFF",
        border: `1px solid ${accent}55`,
        borderLeft: `6px solid ${accent}`,
        borderRadius: 12,
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: FONT_SANS,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: TEXT_PRIMARY,
          letterSpacing: "-0.02em",
        }}
      >
        {term}
      </div>
      <div style={{ fontSize: 18, color: TEXT_MUTED, lineHeight: 1.5 }}>
        {definition}
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 16,
          color: accent,
          fontFamily: exampleMono ? FONT_MONO : FONT_SANS,
          background: `${accent}11`,
          padding: "8px 12px",
          borderRadius: 6,
          alignSelf: "flex-start",
        }}
      >
        {example}
      </div>
    </div>
  );
};
