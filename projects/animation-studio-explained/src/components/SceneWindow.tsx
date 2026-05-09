import type { CSSProperties, ReactNode } from "react";
import { FONT_SANS, TEXT_PRIMARY } from "../data/theme";

type SceneWindowProps = {
  /** 0 = collapsed (just a card), 1 = fully open (showing inner content). */
  openProgress: number;
  title?: string;
  accent?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
  style?: CSSProperties;
};

export const SceneWindow: React.FC<SceneWindowProps> = ({
  openProgress,
  title = "Scene",
  accent = "#1F8A4C",
  width = 720,
  height = 420,
  children,
  style,
}) => {
  const innerOpacity = Math.max(0, (openProgress - 0.5) * 2);
  return (
    <div
      style={{
        width,
        height,
        background: "#FFFFFF",
        border: `2px solid ${accent}`,
        borderRadius: 14,
        boxShadow: "0 18px 50px rgba(0,0,0,0.10)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT_SANS,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          height: 40,
          background: `${accent}11`,
          borderBottom: `1px solid ${accent}33`,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          gap: 10,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FF6058" }} />
        <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FFBC2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: 5, background: "#28C940" }} />
        <div style={{ marginLeft: 12, fontSize: 14, color: TEXT_PRIMARY, fontWeight: 600 }}>
          {title}
        </div>
      </div>
      {/* Inner content */}
      <div
        style={{
          flex: 1,
          opacity: innerOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        {children}
      </div>
    </div>
  );
};
