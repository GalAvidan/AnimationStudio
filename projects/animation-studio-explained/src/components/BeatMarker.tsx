import type { CSSProperties } from "react";
import { FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";

type BeatMarkerProps = {
  index: number;
  title: string;
  /** Optional one-line subtitle (used to hint at content). */
  subtitle?: string;
  accent?: string;
  width?: number;
  style?: CSSProperties;
};

export const BeatMarker: React.FC<BeatMarkerProps> = ({
  index,
  title,
  subtitle,
  accent = "#2C5BA1",
  width = 360,
  style,
}) => {
  return (
    <div
      style={{
        width,
        background: "#FFFFFF",
        border: `1px solid ${accent}55`,
        borderLeft: `5px solid ${accent}`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: FONT_SANS,
        boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: `${accent}22`,
          color: accent,
          fontWeight: 800,
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {index}
      </div>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: TEXT_PRIMARY,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 2 }}>
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
};
