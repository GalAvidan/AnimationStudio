import { AbsoluteFill, Sequence } from "remotion";
import { SEQUENCES } from "../data/beats";
import { AllSourcesTokenScene } from "../scenes/AllSourcesTokenScene";
import { AttentionScene } from "../scenes/AttentionScene";
import { ContextWindowScene } from "../scenes/ContextWindowScene";
import { DetokenizeScene } from "../scenes/DetokenizeScene";
import { GenerationScene } from "../scenes/GenerationScene";
import { HookScene } from "../scenes/HookScene";
import { MathBridgeScene } from "../scenes/MathBridgeScene";
import { PipelineScene } from "../scenes/PipelineScene";
import { TokenizationScene } from "../scenes/TokenizationScene";

export const HowAiChatWorksGeneral: React.FC = () => {

  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      <Sequence
        from={SEQUENCES.hook.from}
        durationInFrames={SEQUENCES.hook.duration}
      >
        <HookScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.tokenization.from}
        durationInFrames={SEQUENCES.tokenization.duration}
      >
        <TokenizationScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.allSourcesTokens.from}
        durationInFrames={SEQUENCES.allSourcesTokens.duration}
      >
        <AllSourcesTokenScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.contextWindow.from}
        durationInFrames={SEQUENCES.contextWindow.duration}
      >
        <ContextWindowScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.attention.from}
        durationInFrames={SEQUENCES.attention.duration}
      >
        <AttentionScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.mathBridge.from}
        durationInFrames={SEQUENCES.mathBridge.duration}
      >
        <MathBridgeScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.generation.from}
        durationInFrames={SEQUENCES.generation.duration}
      >
        <GenerationScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.detokenize.from}
        durationInFrames={SEQUENCES.detokenize.duration}
      >
        <DetokenizeScene />
      </Sequence>

      <Sequence
        from={SEQUENCES.pipeline.from}
        durationInFrames={SEQUENCES.pipeline.duration}
      >
        <PipelineScene />
      </Sequence>
    </AbsoluteFill>
  );
};
