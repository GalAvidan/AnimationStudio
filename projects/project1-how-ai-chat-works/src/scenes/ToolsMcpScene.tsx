import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_TECH } from "../data/beats-technical";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

export const ToolsMcpScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_TECH.toolsMcp;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const serverP  = progress(frame, sync.server, sync.server + 20);
  const arrowP   = progress(frame, sync.arrow,  sync.arrow + 25);
  const resultP  = progress(frame, sync.result, sync.result + 22);
  const captionOpacity = fadeIn(frame, sync.result + 30, 20);

  function boxOpacity(p: number) {
    return interpolate(p, [0, 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  }
  function boxY(p: number) {
    return interpolate(p, [0, 1], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  }

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
        6 — Tools & MCP
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
        MCP standardizes tool access via JSON-RPC. The model sees all tools identically.
      </div>

      {/* ── Architecture diagram ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: 1480,
        }}
      >
        {/* MCP Server */}
        <div
          style={{
            opacity: boxOpacity(serverP),
            transform: `translateY(${boxY(serverP)}px)`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#B45309",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            MCP Server
          </div>
          <div
            style={{
              background: "#FEF3C7",
              border: "2.5px solid #F59E0B",
              borderRadius: 14,
              padding: "28px 36px",
              fontSize: 22,
              fontWeight: 700,
              color: "#92400E",
              textAlign: "center",
              minWidth: 220,
            }}
          >
            External tool
            <br />
            <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.8 }}>
              (web search, DB, API…)
            </span>
          </div>
        </div>

        {/* JSON-RPC arrows */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 16px",
            opacity: boxOpacity(arrowP),
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#6B7280",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            JSON-RPC 2.0
          </div>
          <div style={{ fontSize: 28, color: "#9CA3AF", letterSpacing: 4 }}>⟵⟶</div>
        </div>

        {/* Host */}
        <div
          style={{
            opacity: boxOpacity(arrowP),
            transform: `translateY(${boxY(arrowP)}px)`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#3B6FD4",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Host
          </div>
          <div
            style={{
              background: "#EEF2FF",
              border: "2.5px solid #818CF8",
              borderRadius: 14,
              padding: "20px 28px",
              fontSize: 20,
              color: "#3730A3",
              minWidth: 200,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Tool schema</div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                color: "#4338CA",
                background: "#E0E7FF",
                borderRadius: 6,
                padding: "6px 10px",
              }}
            >
              {"{ name, description,\n  parameters }"}
            </div>
          </div>
        </div>

        {/* Model call → result */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 16px",
            opacity: boxOpacity(arrowP),
            gap: 8,
          }}
        >
          <div style={{ fontSize: 28, color: "#9CA3AF" }}>→</div>
        </div>

        {/* Context window + result */}
        <div
          style={{
            opacity: boxOpacity(resultP),
            transform: `translateY(${boxY(resultP)}px)`,
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#047857",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Context window (after call)
          </div>
          <div
            style={{
              background: "#D1FAE5",
              border: "2.5px solid #34D399",
              borderRadius: 14,
              padding: "20px 28px",
              fontSize: 18,
              fontFamily: "monospace",
              color: "#065F46",
            }}
          >
            …[tool_result]: "Search results…"
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
        The model sees MCP tools identically to built-in tools — they're all just schemas in context.
      </div>
    </AbsoluteFill>
  );
};
