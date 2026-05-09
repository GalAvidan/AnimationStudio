import { AbsoluteFill, Sequence } from "remotion";
import { SEQUENCES, ACTIVE_STAGE_PER_BEAT } from "../data/beats-dev";
import { BACKGROUND } from "../data/theme";
import { HookScene } from "../scenes/HookScene";
import { PipelineOverviewScene } from "../scenes/PipelineOverviewScene";
import { ScriptStageScene } from "../scenes/ScriptStageScene";
import { SpecStageScene } from "../scenes/SpecStageScene";
import { TerminologyScene } from "../scenes/TerminologyScene";
import { BuildStageScene } from "../scenes/BuildStageScene";
import { MultiCompositionScene } from "../scenes/MultiCompositionScene";
import { PreviewStageScene } from "../scenes/PreviewStageScene";
import { RenderStageScene } from "../scenes/RenderStageScene";
import { ReviseLoopScene } from "../scenes/ReviseLoopScene";
import { AgentContextScene } from "../scenes/AgentContextScene";
import { ClosingScene } from "../scenes/ClosingScene";

void ACTIVE_STAGE_PER_BEAT;

const VARIANT = "dev" as const;

export const AnimationStudioExplainedDev: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BACKGROUND }}>
      <Sequence from={SEQUENCES.hook.from} durationInFrames={SEQUENCES.hook.duration}>
        <HookScene durationInFrames={SEQUENCES.hook.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.pipelineOverview.from} durationInFrames={SEQUENCES.pipelineOverview.duration}>
        <PipelineOverviewScene durationInFrames={SEQUENCES.pipelineOverview.duration} />
      </Sequence>
      <Sequence from={SEQUENCES.scriptStage.from} durationInFrames={SEQUENCES.scriptStage.duration}>
        <ScriptStageScene durationInFrames={SEQUENCES.scriptStage.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.specStage.from} durationInFrames={SEQUENCES.specStage.duration}>
        <SpecStageScene durationInFrames={SEQUENCES.specStage.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.terminology.from} durationInFrames={SEQUENCES.terminology.duration}>
        <TerminologyScene durationInFrames={SEQUENCES.terminology.duration} />
      </Sequence>
      <Sequence from={SEQUENCES.buildStage.from} durationInFrames={SEQUENCES.buildStage.duration}>
        <BuildStageScene durationInFrames={SEQUENCES.buildStage.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.multiComposition.from} durationInFrames={SEQUENCES.multiComposition.duration}>
        <MultiCompositionScene durationInFrames={SEQUENCES.multiComposition.duration} />
      </Sequence>
      <Sequence from={SEQUENCES.previewStage.from} durationInFrames={SEQUENCES.previewStage.duration}>
        <PreviewStageScene durationInFrames={SEQUENCES.previewStage.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.renderStage.from} durationInFrames={SEQUENCES.renderStage.duration}>
        <RenderStageScene durationInFrames={SEQUENCES.renderStage.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.reviseLoop.from} durationInFrames={SEQUENCES.reviseLoop.duration}>
        <ReviseLoopScene durationInFrames={SEQUENCES.reviseLoop.duration} variant={VARIANT} />
      </Sequence>
      <Sequence from={SEQUENCES.agentContext.from} durationInFrames={SEQUENCES.agentContext.duration}>
        <AgentContextScene durationInFrames={SEQUENCES.agentContext.duration} />
      </Sequence>
      <Sequence from={SEQUENCES.closing.from} durationInFrames={SEQUENCES.closing.duration}>
        <ClosingScene durationInFrames={SEQUENCES.closing.duration} variant={VARIANT} />
      </Sequence>
    </AbsoluteFill>
  );
};
