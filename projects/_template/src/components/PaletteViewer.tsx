import { useMemo, useState } from "react";
import type { PaletteSet } from "@studio/spec-types";

interface PaletteViewerProps {
  palettes: PaletteSet[];
  initialPaletteId?: string;
}

const swatchLabelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 0.2,
};

const swatchValueStyle: React.CSSProperties = {
  fontSize: 13,
  opacity: 0.8,
};

export const PaletteViewer: React.FC<PaletteViewerProps> = ({
  palettes,
  initialPaletteId,
}) => {
  const resolvedInitialId = useMemo(() => {
    const fallbackId = palettes[0]?.id;
    if (!fallbackId) {
      return "";
    }

    if (!initialPaletteId) {
      return fallbackId;
    }

    return palettes.some((palette) => palette.id === initialPaletteId)
      ? initialPaletteId
      : fallbackId;
  }, [initialPaletteId, palettes]);

  const [selectedId, setSelectedId] = useState(resolvedInitialId);

  const selectedPalette = useMemo(
    () => palettes.find((palette) => palette.id === selectedId) ?? palettes[0],
    [palettes, selectedId]
  );

  if (!selectedPalette) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Segoe UI, system-ui, sans-serif",
          fontSize: 32,
        }}
      >
        No palettes available.
      </div>
    );
  }

  const tokenEntries = Object.entries(selectedPalette.tokens);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        background: selectedPalette.tokens.background,
        color: selectedPalette.tokens.textPrimary,
        fontFamily: "Segoe UI, system-ui, sans-serif",
      }}
    >
      <aside
        style={{
          borderRight: `1px solid ${selectedPalette.tokens.textSecondary}30`,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          background: selectedPalette.tokens.surface,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 30 }}>Palette Review</h2>
        <p style={{ margin: 0, fontSize: 16, color: selectedPalette.tokens.textSecondary }}>
          Switch palettes to review visual direction before full rendering.
        </p>
        <label htmlFor="palette-select" style={{ fontSize: 14, fontWeight: 700 }}>
          Palette
        </label>
        <select
          id="palette-select"
          value={selectedPalette.id}
          onChange={(event) => setSelectedId(event.target.value)}
          style={{
            fontSize: 16,
            padding: "10px 12px",
            borderRadius: 10,
            border: `1px solid ${selectedPalette.tokens.textSecondary}50`,
            background: selectedPalette.tokens.background,
            color: selectedPalette.tokens.textPrimary,
          }}
        >
          {palettes.map((palette) => (
            <option key={palette.id} value={palette.id}>
              {palette.label}
            </option>
          ))}
        </select>
        {selectedPalette.description ? (
          <p style={{ margin: 0, fontSize: 14, color: selectedPalette.tokens.textSecondary }}>
            {selectedPalette.description}
          </p>
        ) : null}
        <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
          {tokenEntries.map(([token, value]) => (
            <div
              key={token}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                alignItems: "center",
                gap: 12,
                padding: 8,
                borderRadius: 12,
                border: `1px solid ${selectedPalette.tokens.textSecondary}35`,
              }}
            >
              <div
                style={{
                  height: 42,
                  borderRadius: 10,
                  background: value,
                  border: `1px solid ${selectedPalette.tokens.textSecondary}35`,
                }}
              />
              <div style={{ display: "grid", gap: 2 }}>
                <span style={swatchLabelStyle}>{token}</span>
                <span style={swatchValueStyle}>{value}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main
        style={{
          padding: 34,
          display: "grid",
          gap: 24,
          alignContent: "start",
        }}
      >
        <section
          style={{
            borderRadius: 24,
            padding: 28,
            background: selectedPalette.tokens.surface,
            border: `1px solid ${selectedPalette.tokens.textSecondary}30`,
            display: "grid",
            gap: 14,
          }}
        >
          <span
            style={{
              fontSize: 14,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: selectedPalette.tokens.textSecondary,
            }}
          >
            Hero Moment
          </span>
          <h1 style={{ margin: 0, fontSize: 54, lineHeight: 1.1 }}>
            See Color Direction Before Rendering
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 24,
              lineHeight: 1.35,
              maxWidth: 920,
              color: selectedPalette.tokens.textSecondary,
            }}
          >
            This representative frame helps reviewers approve look-and-feel quickly,
            before spending time on a full animation export.
          </p>
          <button
            type="button"
            style={{
              width: "fit-content",
              border: "none",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 18,
              fontWeight: 700,
              background: selectedPalette.tokens.accent,
              color: selectedPalette.tokens.accentText,
            }}
          >
            Approve Visual Direction
          </button>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <article
            style={{
              borderRadius: 18,
              padding: 20,
              background: selectedPalette.tokens.surface,
              border: `1px solid ${selectedPalette.tokens.textSecondary}30`,
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 24 }}>Narration Panel</h3>
            <p style={{ margin: 0, fontSize: 18, color: selectedPalette.tokens.textSecondary }}>
              Check subtitle and narration readability against scene backgrounds.
            </p>
          </article>
          <article
            style={{
              borderRadius: 18,
              padding: 20,
              background: selectedPalette.tokens.surface,
              border: `1px solid ${selectedPalette.tokens.textSecondary}30`,
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 24 }}>Callout Panel</h3>
            <p style={{ margin: 0, fontSize: 18, color: selectedPalette.tokens.textSecondary }}>
              Validate accent colors for callouts and key moments at a glance.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};
