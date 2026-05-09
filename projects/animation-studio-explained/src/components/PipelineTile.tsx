import type { CSSProperties } from "react";
import type { StageDef } from "../data/theme";
import { TEXT_PRIMARY, FONT_SANS } from "../data/theme";

type PipelineTileProps = {
  stage: StageDef;
  active?: boolean;
  size?: "sm" | "md";
  style?: CSSProperties;
};

export const PipelineTile: React.FC<PipelineTileProps> = ({
  stage,
  active = false,
  size = "md",
  style,
}) => {
  const dims = size === "md"
    ? { w: 220, h: 140, label: 28, icon: 40, pad: 18 }
    : { w: 160, h: 100, label: 20, icon: 28, pad: 12 };

  const glow = active ? `0 0 0 3px ${stage.accent}, 0 12px 36px ${stage.accent}33` : "0 4px 14px rgba(0,0,0,0.06)";
  const borderColor = active ? stage.accent : "#E5E7EB";

  return (
    <div
      style={{
        width: dims.w,
        height: dims.h,
        background: stage.fill,
        border: `2px solid ${borderColor}`,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: dims.pad,
        boxShadow: glow,
        fontFamily: FONT_SANS,
        transition: "none",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: dims.icon,
          color: stage.accent,
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {stage.icon}
      </div>
      <div
        style={{
          fontSize: dims.label,
          fontWeight: 700,
          color: TEXT_PRIMARY,
          letterSpacing: "-0.01em",
        }}
      >
        {stage.label}
      </div>
    </div>
  );
};
