import { AbsoluteFill, useCurrentFrame } from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: 48,
        color: "#111111",
      }}
    >
      Frame {frame}
    </AbsoluteFill>
  );
};
