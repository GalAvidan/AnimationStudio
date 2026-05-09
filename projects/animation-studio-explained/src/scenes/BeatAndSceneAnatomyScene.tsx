import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BeatMarker } from "../components/BeatMarker";
import { SceneWindow } from "../components/SceneWindow";
import { BACKGROUND, FONT_SANS, TEXT_PRIMARY, TEXT_MUTED } from "../data/theme";
import { easeInOut, easeOut, fadeIn, sceneOpacity } from "../utils/animation";

type BeatAndSceneAnatomySceneProps = {
  durationInFrames: number;
};

/**
 * GENERAL-VARIANT drill-down.
 * A single beat card zooms forward and "opens" into a scene window
 * containing a tiny mini-animation. Used in the general composition only.
 */
export const BeatAndSceneAnatomyScene: React.FC<BeatAndSceneAnatomySceneProps> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, 0, durationInFrames - 18, 18);

  const headerOpacity = fadeIn(frame, 0, 18);
  const beatOpacity = fadeIn(frame, 30, 18);

  // Beat card scales up before transforming into a scene window.
  const zoomStart = 80;
  const zoomEnd = 140;
  const zoom = interpolate(frame, [zoomStart, zoomEnd], [1, 2.2], {
    easing: easeInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Beat card fades out as scene window opens.
  const beatFade = interpolate(frame, [zoomEnd - 10, zoomEnd + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene window opens.
  const openProgress = interpolate(
    frame,
    [zoomEnd, zoomEnd + 36],
    [0, 1],
    { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const windowOpacity = fadeIn(frame, zoomEnd, 18);

  // Mini-animation inside the scene window: 3 dots travel left to right.
  const innerStart = zoomEnd + 50;
  const dotProgress = interpolate(
    frame,
    [innerStart, innerStart + 80],
    [0, 1],
    { easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        fontFamily: FONT_SANS,
        opacity,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ opacity: headerOpacity, textAlign: "center" }}>
        <div
          style={{
            fontSize: 22,
            color: TEXT_MUTED,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Zoom in
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            color: TEXT_PRIMARY,
            letterSpacing: "-0.02em",
            marginTop: 8,
          }}
        >
          What is a beat? What is a scene?
        </div>
      </div>

      <div
        style={{
          flex: 1,
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        {/* Beat card (zooms up, then fades) */}
        <div
          style={{
            position: "absolute",
            opacity: beatOpacity * beatFade,
            transform: `scale(${zoom})`,
          }}
        >
          <BeatMarker
            index={5}
            title="A beat"
            subtitle="One moment of viewer understanding."
            accent="#2C5BA1"
            width={420}
          />
        </div>

        {/* Scene window (opens with mini-animation inside) */}
        <div
          style={{
            position: "absolute",
            opacity: windowOpacity,
            transform: `scale(${interpolate(frame, [zoomEnd, zoomEnd + 24], [0.6, 1], {
              easing: easeOut,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        >
          <SceneWindow
            openProgress={openProgress}
            title="A scene = one piece of code"
            accent="#1F8A4C"
            width={760}
            height={420}
          >
            <MiniSceneAnimation progress={dotProgress} />
          </SceneWindow>
        </div>
      </div>

      {/* Bottom caption */}
      <div
        style={{
          fontSize: 24,
          color: TEXT_MUTED,
          textAlign: "center",
          maxWidth: 1100,
          lineHeight: 1.5,
          opacity: windowOpacity,
        }}
      >
        Beats group into scenes. One scene becomes one piece of code.
      </div>
    </AbsoluteFill>
  );
};

const MiniSceneAnimation: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {[0, 1, 2].map((i) => {
        const localStart = i * 0.25;
        const localEnd = localStart + 0.5;
        const p = Math.max(0, Math.min(1, (progress - localStart) / (localEnd - localStart)));
        return (
          <div
            key={i}
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "#1F8A4C",
              opacity: 0.25 + p * 0.75,
              transform: `scale(${0.7 + p * 0.5}) translateX(${(p - 0.5) * 80}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
