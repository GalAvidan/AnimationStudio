import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

type ReactLoopSceneProps = {
  stepLabel: string;
  sync: {
    fadeIn: number;
    think: number;
    call: number;
    observe: number;
    generates: number;
    fadeOut: number;
  };
};

const BOX_W = 260;
const BOX_H = 72;

function LoopBox({
  label,
  sublabel,
  color,
  bg,
  x,
  y,
  entranceProgress,
}: {
  label: string;
  sublabel?: string;
  color: string;
  bg: string;
  x: number;
  y: number;
  entranceProgress: number;
}) {
  const opacity = interpolate(entranceProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(entranceProgress, [0, 0.6, 1], [0.88, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - BOX_W / 2,
        top: y - BOX_H / 2,
        width: BOX_W,
        height: BOX_H,
        background: bg,
        border: `2.5px solid ${color}`,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1.1 }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: 16, fontWeight: 500, color, opacity: 0.7, marginTop: 2 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

function Arrow({
  x1, y1, x2, y2, progress: p, curved = false, label,
}: {
  x1: number; y1: number; x2: number; y2: number;
  progress: number;
  curved?: boolean;
  label?: string;
}) {
  const opacity = interpolate(p, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const ax1 = x1 + ux * 10;
  const ay1 = y1 + uy * 10;
  const ax2 = x2 - ux * 18;
  const ay2 = y2 - uy * 18;

  const midX = (ax1 + ax2) / 2 + (curved ? -80 : 0);
  const midY = (ay1 + ay2) / 2 + (curved ? 0 : 0);

  const d = curved
    ? `M ${ax1} ${ay1} Q ${midX} ${midY} ${ax2} ${ay2}`
    : `M ${ax1} ${ay1} L ${ax2} ${ay2}`;

  return (
    <g opacity={opacity}>
      <path d={d} stroke="#6B7280" strokeWidth={2.5} fill="none" />
      <polygon
        points={`0,-7 6,5 -6,5`}
        transform={`translate(${ax2},${ay2}) rotate(${Math.atan2(ay2 - (curved ? midY : ay1), ax2 - (curved ? midX : ax1)) * (180 / Math.PI) + 90})`}
        fill="#6B7280"
      />
      {label && (
        <text
          x={(ax1 + ax2) / 2 + (curved ? -100 : 0)}
          y={(ay1 + ay2) / 2 + (curved ? 0 : -14)}
          textAnchor="middle"
          fontSize={18}
          fill="#9CA3AF"
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export const ReactLoopScene: React.FC<ReactLoopSceneProps> = ({ stepLabel, sync }) => {
  const frame = useCurrentFrame();

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const thinkP  = progress(frame, sync.think,     sync.think + 20);
  const callP   = progress(frame, sync.call,      sync.call + 20);
  const observeP= progress(frame, sync.observe,   sync.observe + 20);
  const genP    = progress(frame, sync.generates, sync.generates + 20);

  // Arrow: Think → Call Tool (right)
  const arrow1P = progress(frame, sync.think + 18,   sync.think + 35);
  // Arrow: Call Tool → Observe (down / right)
  const arrow2P = progress(frame, sync.call + 18,    sync.call + 35);
  // Arrow: Observe → Think (loop back left)
  const arrow3P = progress(frame, sync.observe + 18, sync.observe + 35);
  // Arrow: loop → Generate (exit)
  const arrow4P = progress(frame, sync.generates,    sync.generates + 25);

  const captionOpacity = fadeIn(frame, sync.generates + 30, 20);

  // Layout: Think at left, Call Tool at right, Observe below Call Tool
  // Loop back arrow goes from Observe back up to Think
  const CX = 960;
  const CY = 500;
  const thinkX = CX - 320;
  const thinkY = CY;
  const callX  = CX + 320;
  const callY  = CY;
  const obsX   = CX + 320;
  const obsY   = CY + 200;
  const genX   = CX - 320;
  const genY   = CY + 380;

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
        {stepLabel}
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 46,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        For complex tasks: Reason → Act → Observe.
      </div>

      {/* ── SVG arrows ── */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible" }}
        viewBox="0 0 1920 1080"
      >
        {/* Think → Call Tool */}
        <Arrow x1={thinkX + BOX_W / 2} y1={thinkY} x2={callX - BOX_W / 2} y2={callY} progress={arrow1P} label="Reason" />
        {/* Call Tool → Observe */}
        <Arrow x1={callX} y1={callY + BOX_H / 2} x2={obsX} y2={obsY - BOX_H / 2} progress={arrow2P} label="Act" />
        {/* Observe → Think (loop back — curved left) */}
        <Arrow x1={obsX - BOX_W / 2} y1={obsY} x2={thinkX} y2={thinkY + BOX_H / 2} progress={arrow3P} curved label="Observe" />
        {/* Loop → Generate (exit downward) */}
        <Arrow x1={thinkX} y1={thinkY + BOX_H / 2} x2={genX} y2={genY - BOX_H / 2} progress={arrow4P} />
      </svg>

      {/* ── Loop boxes ── */}
      <LoopBox label="Reason"     sublabel="Think"       color="#3B6FD4" bg="#EEF2FF" x={thinkX} y={thinkY} entranceProgress={thinkP} />
      <LoopBox label="Act"        sublabel="Call Tool"   color="#047857" bg="#D1FAE5" x={callX}  y={callY}  entranceProgress={callP}  />
      <LoopBox label="Observe"    sublabel="Read result" color="#B45309" bg="#FEF3C7" x={obsX}   y={obsY}   entranceProgress={observeP} />
      <LoopBox label="Generate"   sublabel="Final answer" color="#111111" bg="#F9FAFB" x={genX}   y={genY}   entranceProgress={genP}  />

      {/* ── Caption ── */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          fontWeight: 500,
          color: "#6B7280",
          opacity: captionOpacity,
        }}
      >
        Each tool call injects the result back into context, then generation resumes.
      </div>
    </AbsoluteFill>
  );
};
