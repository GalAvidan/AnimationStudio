import { AbsoluteFill, Sequence } from "remotion";
import {
  CONTEXT_BLOCKS_TECH,
  CONTEXT_BLOCK_STAGGER_TECH,
  LOCAL_SYNC_TECH,
  OUTPUT_TOKENS_TECH,
  SEQUENCES_TECH,
  TOKEN_GEN_STAGGER_TECH,
} from "../data/beats-technical";
import { AutoregressiveScene } from "../scenes/AutoregressiveScene";
import { CausalAttentionMatrixScene } from "../scenes/CausalAttentionMatrixScene";
import { ChainOfThoughtScene } from "../scenes/ChainOfThoughtScene";
import { ContextAssemblyScene } from "../scenes/ContextAssemblyScene";
import { MemoryTiersScene } from "../scenes/MemoryTiersScene";
import { ReactLoopScene } from "../scenes/ReactLoopScene";
import { SkillsScene } from "../scenes/SkillsScene";
import { TechPipelineScene } from "../scenes/TechPipelineScene";
import { TokenizationDetailScene } from "../scenes/TokenizationDetailScene";
import { ToolsMcpScene } from "../scenes/ToolsMcpScene";

export const HowAiChatWorksTechnical: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#FFFFFF" }}>
      {/* ── 1 — Tokenization ── */}
      <Sequence
        from={SEQUENCES_TECH.tokenization.from}
        durationInFrames={SEQUENCES_TECH.tokenization.duration}
      >
        <TokenizationDetailScene />
      </Sequence>

      {/* ── 2 — Context window assembly ── */}
      <Sequence
        from={SEQUENCES_TECH.contextAssembly.from}
        durationInFrames={SEQUENCES_TECH.contextAssembly.duration}
      >
        <ContextAssemblyScene
          stepLabel="2 — Context Window"
          title="A single flat sequence. No implicit state. No out-of-band retrieval."
          caption="[System Prompt] [Tool Schemas] [Memory] [Skills] [History] [New Message]"
          blocks={CONTEXT_BLOCKS_TECH}
          blockStagger={CONTEXT_BLOCK_STAGGER_TECH}
          sync={LOCAL_SYNC_TECH.contextAssembly}
        />
      </Sequence>

      {/* ── 3 — Causal attention matrix ── */}
      <Sequence
        from={SEQUENCES_TECH.causalAttention.from}
        durationInFrames={SEQUENCES_TECH.causalAttention.duration}
      >
        <CausalAttentionMatrixScene />
      </Sequence>

      {/* ── 4 — ReAct loop ── */}
      <Sequence
        from={SEQUENCES_TECH.reactLoop.from}
        durationInFrames={SEQUENCES_TECH.reactLoop.duration}
      >
        <ReactLoopScene
          stepLabel="4 — ReAct Loop (Agentic Mode)"
          sync={LOCAL_SYNC_TECH.reactLoop}
        />
      </Sequence>

      {/* ── 5 — Chain of Thought ── */}
      <Sequence
        from={SEQUENCES_TECH.chainOfThought.from}
        durationInFrames={SEQUENCES_TECH.chainOfThought.duration}
      >
        <ChainOfThoughtScene />
      </Sequence>

      {/* ── 6 — Tools & MCP ── */}
      <Sequence
        from={SEQUENCES_TECH.toolsMcp.from}
        durationInFrames={SEQUENCES_TECH.toolsMcp.duration}
      >
        <ToolsMcpScene />
      </Sequence>

      {/* ── 7 — Skills as prompt injection ── */}
      <Sequence
        from={SEQUENCES_TECH.skills.from}
        durationInFrames={SEQUENCES_TECH.skills.duration}
      >
        <SkillsScene />
      </Sequence>

      {/* ── 8 — Memory tiers ── */}
      <Sequence
        from={SEQUENCES_TECH.memoryTiers.from}
        durationInFrames={SEQUENCES_TECH.memoryTiers.duration}
      >
        <MemoryTiersScene />
      </Sequence>

      {/* ── 9 — Autoregressive generation ── */}
      <Sequence
        from={SEQUENCES_TECH.autoregressive.from}
        durationInFrames={SEQUENCES_TECH.autoregressive.duration}
      >
        <AutoregressiveScene
          stepLabel="9 — Autoregressive Generation"
          outputTokens={OUTPUT_TOKENS_TECH}
          tokenStagger={TOKEN_GEN_STAGGER_TECH}
          sync={LOCAL_SYNC_TECH.autoregressive}
        />
      </Sequence>

      {/* ── 10 — Full pipeline ── */}
      <Sequence
        from={SEQUENCES_TECH.fullPipeline.from}
        durationInFrames={SEQUENCES_TECH.fullPipeline.duration}
      >
        <TechPipelineScene />
      </Sequence>
    </AbsoluteFill>
  );
};
