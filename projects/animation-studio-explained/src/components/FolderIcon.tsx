import type { CSSProperties } from "react";
import { FONT_SANS } from "../data/theme";

type FolderIconProps = {
  label: string;
  /** Accent color for the folder tab. */
  accent?: string;
  /** Render label inline (mono path style) instead of below. */
  pathStyle?: boolean;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
};

export const FolderIcon: React.FC<FolderIconProps> = ({
  label,
  accent = "#A07A28",
  size = "md",
  style,
}) => {
  const dims = {
    sm: { w: 120, h: 90,  fs: 14 },
    md: { w: 200, h: 150, fs: 18 },
    lg: { w: 280, h: 210, fs: 22 },
  }[size];

  return (
    <div
      style={{
        position: "relative",
        width: dims.w,
        fontFamily: FONT_SANS,
        ...style,
      }}
    >
      {/* Folder tab */}
      <div
        style={{
          width: dims.w * 0.45,
          height: dims.h * 0.18,
          background: accent,
          borderRadius: "8px 8px 0 0",
          marginLeft: 12,
        }}
      />
      {/* Folder body */}
      <div
        style={{
          width: dims.w,
          height: dims.h,
          background: `${accent}22`,
          border: `2px solid ${accent}`,
          borderRadius: "8px 8px 12px 12px",
          marginTop: -2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent,
          fontWeight: 700,
          fontSize: dims.fs,
          textAlign: "center",
          padding: 12,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        }}
      >
        {label}
      </div>
    </div>
  );
};
