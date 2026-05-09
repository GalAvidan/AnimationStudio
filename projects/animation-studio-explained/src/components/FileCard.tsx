import type { CSSProperties } from "react";
import { TEXT_MUTED, FONT_SANS, FONT_MONO } from "../data/theme";

type FileCardProps = {
  filename: string;
  /** Optional path label shown under the card (used in the dev variant). */
  path?: string;
  /** Accent color used for the small file-type stripe. */
  accent?: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

export const FileCard: React.FC<FileCardProps> = ({
  filename,
  path,
  accent = "#9CA3AF",
  width = 220,
  height = 280,
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width,
        ...style,
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          width,
          height,
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderTop: `4px solid ${accent}`,
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#111111",
            wordBreak: "break-word",
          }}
        >
          {filename}
        </div>
        {/* fake content lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
          {[0.95, 0.7, 0.85, 0.5, 0.8, 0.6, 0.4].map((w, i) => (
            <div
              key={i}
              style={{
                height: 6,
                width: `${w * 100}%`,
                background: "#E5E7EB",
                borderRadius: 3,
              }}
            />
          ))}
        </div>
      </div>
      {path ? (
        <div
          style={{
            marginTop: 10,
            fontSize: 14,
            fontFamily: FONT_MONO,
            color: TEXT_MUTED,
            textAlign: "center",
          }}
        >
          {path}
        </div>
      ) : null}
    </div>
  );
};
