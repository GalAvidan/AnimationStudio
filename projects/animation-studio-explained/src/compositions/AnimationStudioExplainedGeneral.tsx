import { AbsoluteFill, Sequence } from "remotion";
import { SEQUENCES, ACTIVE_STAGE_PER_BEAT } from "../data/beats-general";
import { BACKGROUND } from "../data/theme";
import { HookScene } from "../scenes/HookScene";
import { PipelineOverviewScene } from "../scenes/PipelineOverviewScene";
import { ScriptStageScene } from "../scenes/ScriptStageScene";
import { SpecStageScene } from "../scenes/SpecStageScene";
import { BeatAndSceneAnatomyScene } from "../scenes/BeatAndSceneAnatomyScene";
import { BuildStageScene } from "../scenes/BuildStageScene";
import { PreviewStageScene } from "../scenes/PreviewStageScene";
import { RenderStageScene } from "../scenes/RenderStageScene";
import { ReviseLoopScene } from "../scenes/ReviseLoopScene";
import { ClosingScene } from "../scenes/ClosingScene";

// `ACTIVE_STAGE_PER_BEAT` is currently informational; consumed below to keep
// the symbol exported and used (avoids unused-import warnings).
void ACTIVE_STAGE_PER_BEAT;

const VARIANT = "general" as const;

export const AnimationStudioExplainedGeneral: React.FC = () => {
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
      <Sequence from={SEQUENCES.beatAndScene.from} durationInFrames={SEQUENCES.beatAndScene.duration}>
        <BeatAndSceneAnatomyScene durationInFrames={SEQUENCES.beatAndScene.duration} />
      </Sequence>
      <Sequence from={SEQUENCES.buildStage.from} durationInFrames={SEQUENCES.buildStage.duration}>
        <BuildStageScene durationInFrames={SEQUENCES.buildStage.duration} variant={VARIANT} />
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
      <Sequence from={SEQUENCES.closing.from} durationInFrames={SEQUENCES.closing.duration}>
        <ClosingScene durationInFrames={SEQUENCES.closing.duration} variant={VARIANT} />
      </Sequence>
    </AbsoluteFill>
  );
};
