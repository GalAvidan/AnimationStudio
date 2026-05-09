import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { LOCAL_SYNC_DEV } from "../data/beats-dev";
import { fadeIn, progress, sceneOpacity } from "../utils/animation";

const SCHEMA_JSON = `{
  "name": "search_web",
  "description": "Search the web",
  "parameters": {
    "query": { "type": "string" }
  }
}`;

const CALL_JSON = `{
  "tool": "search_web",
  "parameters": {
    "query": "latest AI news"
  }
}`;

const RESULT_TEXT = `"Here are today's top AI headlines…"`;

export const ToolsDevScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sync = LOCAL_SYNC_DEV.tools;

  const opacity = sceneOpacity(frame, sync.fadeIn, sync.fadeOut, 18);
  const labelOpacity = fadeIn(frame, 0, 15);
  const titleOpacity = fadeIn(frame, 10, 20);

  const schemaP = progress(frame, sync.schemaIn, sync.schemaIn + 22);
  const schemaOpacity = interpolate(schemaP, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const schemaY = interpolate(schemaP, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const arrow1Opacity = fadeIn(frame, sync.schemaIn + 25, 18);
  const jsonOpacity   = fadeIn(frame, sync.jsonOut, 20);
  const arrow2Opacity = fadeIn(frame, sync.jsonOut + 25, 18);
  const resultOpacity = fadeIn(frame, sync.injected, 20);
  const captionOpacity= fadeIn(frame, sync.injected + 30, 20);

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
        Step 4 — Tools
      </div>

      {/* ── Title ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          right: 120,
          fontSize: 44,
          fontWeight: 800,
          color: "#111111",
          letterSpacing: "-0.02em",
          opacity: titleOpacity,
        }}
      >
        Tools are JSON schemas. The model outputs a call; the host executes it.
      </div>

      {/* ── Three-column layout ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: 1500,
        }}
      >
        {/* Schema card */}
        <div
          style={{
            flex: 1,
            opacity: schemaOpacity,
            transform: `translateY(${schemaY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#047857",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Tool Schema (in context)
          </div>
          <pre
            style={{
              background: "#F0FDF4",
              border: "2px solid #A7F3D0",
              borderRadius: 12,
              padding: "24px 28px",
              fontSize: 20,
              fontFamily: "monospace",
              color: "#065F46",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {SCHEMA_JSON}
          </pre>
        </div>

        {/* Arrow 1 */}
        <div
          style={{
            fontSize: 42,
            color: "#6B7280",
            padding: "0 24px",
            opacity: arrow1Opacity,
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* Model JSON output */}
        <div style={{ flex: 1, opacity: jsonOpacity }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#3B6FD4",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Model Output
          </div>
          <pre
            style={{
              background: "#EEF2FF",
              border: "2px solid #A5B4FC",
              borderRadius: 12,
              padding: "24px 28px",
              fontSize: 20,
              fontFamily: "monospace",
              color: "#3730A3",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {CALL_JSON}
          </pre>
        </div>

        {/* Arrow 2 */}
        <div
          style={{
            fontSize: 42,
            color: "#6B7280",
            padding: "0 24px",
            opacity: arrow2Opacity,
            flexShrink: 0,
          }}
        >
          →
        </div>

        {/* Result injected */}
        <div style={{ flex: 1, opacity: resultOpacity }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#B45309",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Result → Context
          </div>
          <div
            style={{
              background: "#FEF3C7",
              border: "2px solid #FCD34D",
              borderRadius: 12,
              padding: "24px 28px",
              fontSize: 20,
              fontFamily: "monospace",
              color: "#92400E",
              lineHeight: 1.6,
            }}
          >
            {RESULT_TEXT}
          </div>
        </div>
      </div>

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
        From the model's perspective: it's just more tokens.
      </div>
    </AbsoluteFill>
  );
};
