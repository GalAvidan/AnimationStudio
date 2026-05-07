import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { IdeaCard } from "../components/IdeaCard";
import { StepBadge } from "../components/StepBadge";
import { ideaCards, processSteps } from "../data/beats";

const clampProgress = (seconds: number, start: number, end: number) => {
  return interpolate(seconds, [start, end], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

export const ExplainerStarter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;

  const cardEntrance = clampProgress(seconds, 0.2, 1.1);
  const orderProgress = clampProgress(seconds, 2.0, 3.6);
  const stepProgress = clampProgress(seconds, 4.0, 6.2);
  const finalProgress = clampProgress(seconds, 7.0, 8.2);
  const cardOpacity = interpolate(seconds, [6.7, 7.3], [1, 0.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="scene-root">
      <div className="header-block">
        <div className="eyebrow">AnimationStudio</div>
        <h1>Clearer, not just prettier.</h1>
      </div>

      <div className="stage">
        {ideaCards.map((card, cardIndex) => {
          const positionX = interpolate(orderProgress, [0, 1], [card.clusterX, card.orderedX]);
          const positionY = interpolate(orderProgress, [0, 1], [card.clusterY, card.orderedY]);
          const rotation = interpolate(orderProgress, [0, 1], [cardIndex * 7 - 7, 0]);
          const scale = interpolate(cardEntrance, [0, 1], [0.9, 1]);

          return (
            <IdeaCard
              key={card.label}
              label={card.label}
              detail={card.detail}
              style={{
                opacity: cardEntrance * cardOpacity,
                transform: `translate(${positionX}px, ${positionY}px) rotate(${rotation}deg) scale(${scale})`,
              }}
            />
          );
        })}

        <div
          className="connector-line"
          style={{
            opacity: finalProgress,
            transform: `scaleX(${finalProgress})`,
          }}
        />
      </div>

      <div
        className="steps"
        style={{
          opacity: stepProgress,
          transform: `translateY(${interpolate(stepProgress, [0, 1], [28, 0])}px)`,
        }}
      >
        {processSteps.map((label, stepIndex) => (
          <StepBadge key={label} label={label} index={stepIndex} progress={stepProgress} />
        ))}
      </div>

      <div
        className="final-message"
        style={{
          opacity: finalProgress,
          transform: `translateY(${interpolate(finalProgress, [0, 1], [34, 0])}px)`,
        }}
      >
        The goal is a clearer explanation.
      </div>
    </AbsoluteFill>
  );
};
