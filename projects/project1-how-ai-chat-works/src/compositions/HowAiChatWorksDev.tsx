import { AbsoluteFill, Sequence } from "remotion";
import {
  CONTEXT_BLOCKS_DEV,
  CONTEXT_BLOCK_STAGGER_DEV,
  LOCAL_SYNC_DEV,
  OUTPUT_TOKENS_DEV,
  SEQUENCES_DEV,
  TOKEN_GEN_STAGGER_DEV,
} from "../data/beats-dev";
import { AutoregressiveScene } from "../scenes/AutoregressiveScene";
import { ContextAssemblyScene } from "../scenes/ContextAssemblyScene";
import { DevHookScene } from "../scenes/DevHookScene";
import { ReactLoopScene } from "../scenes/ReactLoopScene";
import { ToolsDevScene } from "../scenes/ToolsDevScene";
import { TransformerPassScene } from "../scenes/TransformerPassScene";

export const HowAiChatWorksDev: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* ── 0 — Opening hook (terminal style) ── */}
      <Sequence
        from={SEQUENCES_DEV.hook.from}
        durationInFrames={SEQUENCES_DEV.hook.duration}
      >
        <DevHookScene />
      </Sequence>

      {/* ── 1 — Context assembly (6 blocks) ── */}
      <Sequence
        from={SEQUENCES_DEV.contextAssembly.from}
        durationInFrames={SEQUENCES_DEV.contextAssembly.duration}
      >
        <ContextAssemblyScene
          stepLabel="Step 1 — Context Assembly"
          title="The model receives one input: a flat token sequence called the context window."
          caption="No database. No hidden state. Everything fits in one prompt."
          blocks={CONTEXT_BLOCKS_DEV}
          blockStagger={CONTEXT_BLOCK_STAGGER_DEV}
          sync={LOCAL_SYNC_DEV.contextAssembly}
        />
      </Sequence>

      {/* ── 2 — Transformer forward pass ── */}
      <Sequence
        from={SEQUENCES_DEV.transformerPass.from}
        durationInFrames={SEQUENCES_DEV.transformerPass.duration}
      >
        <TransformerPassScene />
      </Sequence>

      {/* ── 3 — ReAct loop ── */}
      <Sequence
        from={SEQUENCES_DEV.reactLoop.from}
        durationInFrames={SEQUENCES_DEV.reactLoop.duration}
      >
        <ReactLoopScene
          stepLabel="Step 3 — ReAct Loop"
          sync={LOCAL_SYNC_DEV.reactLoop}
        />
      </Sequence>

      {/* ── 4 — Tools ── */}
      <Sequence
        from={SEQUENCES_DEV.tools.from}
        durationInFrames={SEQUENCES_DEV.tools.duration}
      >
        <ToolsDevScene />
      </Sequence>

      {/* ── 5 — Autoregressive generation ── */}
      <Sequence
        from={SEQUENCES_DEV.generation.from}
        durationInFrames={SEQUENCES_DEV.generation.duration}
      >
        <AutoregressiveScene
          stepLabel="Step 5 — Response"
          outputTokens={OUTPUT_TOKENS_DEV}
          tokenStagger={TOKEN_GEN_STAGGER_DEV}
          sync={LOCAL_SYNC_DEV.generation}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
