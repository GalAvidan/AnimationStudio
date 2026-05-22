/**
 * @studio/audio-spec
 *
 * Types for the audio pipeline: narration planning, TTS generation, forced
 * alignment, music/SFX selection, and compiled timeline output.
 *
 * Kept separate from @studio/spec-types so the audio pipeline can evolve
 * without churning visual types.
 */

// ---------------------------------------------------------------------------
// Voice / TTS
// ---------------------------------------------------------------------------

/**
 * Which TTS engine to use for a voice.
 *
 * - `piper`      — Piper TTS (ONNX, local, fast on CPU). Recommended default.
 * - `xtts`       — Coqui XTTS-v2 (voice cloning from a reference sample).
 * - `espeak`     — eSpeak NG (ultra-fast placeholder; robotic quality).
 * - `webspeech`  — Browser Web Speech API (in-browser preview only).
 */
export type TtsEngine = "piper" | "xtts" | "espeak" | "webspeech";

/**
 * Configuration for a single voice.
 * One entry per character id (use `"_narrator"` for the default narration voice).
 */
export interface VoiceProfile {
  engine: TtsEngine;
  /** Engine-specific voice identifier, e.g. `"en_US-lessac-medium"` for Piper. */
  voiceId: string;
  /** Speaking rate multiplier. 1.0 = normal speed. */
  rate?: number;
  /** Pitch offset in semitones (engine-dependent; 0 = default). */
  pitch?: number;
  /**
   * Free-form style hint passed to the engine. For XTTS this is a text prompt
   * describing speaking style (e.g. `"warm, conversational"`). Ignored by Piper.
   */
  style?: string;
  /** Fixed seed for reproducible generation. */
  seed?: number;
  /**
   * Path relative to the project root for a short reference audio clip.
   * Required for XTTS voice cloning. Stored inside the project for reproducibility.
   */
  referenceAudio?: string;
}

// ---------------------------------------------------------------------------
// SFX anchoring
// ---------------------------------------------------------------------------

/**
 * Where in time to place a sound effect.
 *
 * - `beat-offset`  — N seconds after a beat's start.
 * - `word-index`   — on the Nth word of a beat's narration (0-based).
 * - `sync-point`   — at a named SyncPoint from the spec / compiled timeline.
 */
export type SfxAnchor =
  | { type: "beat-offset"; beatId: string; offsetSeconds: number }
  | { type: "word-index"; beatId: string; wordIndex: number }
  | { type: "sync-point"; syncPointId: string };

// ---------------------------------------------------------------------------
// Authored plan (audio/plan.json)
// ---------------------------------------------------------------------------

/**
 * A single sound-effect cue as authored in the plan.
 * Anchors are resolved to absolute seconds when the timeline is compiled.
 */
export interface AudioCue {
  id: string;
  label?: string;
  anchor: SfxAnchor;
  /**
   * Path relative to the project root (e.g. `"audio/sfx/whoosh.wav"`), or a
   * plain-English query string for the agent to resolve (e.g. `"whoosh"`).
   */
  fileRef: string;
  /** Volume 0–1. Default: 1. */
  volume?: number;
  /** Source URL for license tracking (e.g. Freesound permalink). */
  sourceUrl?: string;
  license?: string;
}

/**
 * Music bed for a single scene as authored in the plan.
 */
export interface MusicBed {
  sceneId: string;
  /** Free-form mood tag, e.g. `"neutral"`, `"tense"`, `"uplifting"`. */
  mood: string;
  intensity?: "low" | "medium" | "high";
  /**
   * Path relative to the project root (e.g. `"audio/music/ambient.mp3"`),
   * or omit to let the agent select from the curated pack.
   */
  trackRef?: string;
  /** Fade-in duration in seconds. Default: 1. */
  fadeInSeconds?: number;
  /** Fade-out duration in seconds. Default: 1. */
  fadeOutSeconds?: number;
  /** Source URL for license tracking. */
  sourceUrl?: string;
  license?: string;
}

/** Global audio mixing parameters. */
export interface MixingSettings {
  /**
   * How much to reduce music volume while narration is playing.
   * 0 = silence music completely; 1 = no ducking. Default: 0.25.
   */
  musicDuckingRatio?: number;
  /** Integrated loudness target in LUFS (EBU R128). Default: -16 (web). */
  targetLufs?: number;
}

/**
 * Authored audio plan — lives at `projects/<name>/audio/plan.json`.
 * Created by the `create-audio-plan` task and edited by the user before
 * any TTS generation runs.
 */
export interface AudioPlan {
  /** Must match the project's `slug` in `project.config.ts`. */
  projectSlug: string;
  /** Must match one of the project's `variants[].id`. */
  variantId: string;
  /**
   * Voice profiles keyed by character id.
   * Use `"_narrator"` for the default narration voice (beats without a speaker).
   */
  voices: Record<string, VoiceProfile>;
  scenes: Array<{
    sceneId: string;
    music: MusicBed;
    sfx: AudioCue[];
  }>;
  mixing: MixingSettings;
  /** Schema version — increment when breaking changes are made to this type. */
  version: "1";
}

// ---------------------------------------------------------------------------
// Alignment output (audio/alignment/<beatId>.json)
// ---------------------------------------------------------------------------

/** Timing for a single word produced by forced alignment. */
export interface AlignedWord {
  word: string;
  startSeconds: number;
  endSeconds: number;
  /** Confidence score 0–1 from the alignment model, if available. */
  confidence?: number;
}

// ---------------------------------------------------------------------------
// Generated narration clip (referenced from compiled timeline)
// ---------------------------------------------------------------------------

/**
 * Metadata for a single TTS-generated narration clip for one beat.
 * Written by `generate-narration` and consumed by `compile-timeline`.
 */
export interface NarrationClip {
  beatId: string;
  /** Path relative to the project root, e.g. `"audio/narration/beat-1.wav"`. */
  fileRef: string;
  /**
   * SHA-256 hash of (narration text + voice id + serialised VoiceProfile).
   * Used by `generate-narration` to skip beats whose input hasn't changed.
   */
  contentHash: string;
  durationSeconds: number;
  /** Word-level timings from forced alignment. Empty until `align-narration` runs. */
  words: AlignedWord[];
}

// ---------------------------------------------------------------------------
// Compiled timeline (audio/compiled.timeline.json)
// ---------------------------------------------------------------------------

/** SFX placement after the anchor has been resolved to an absolute time. */
export interface ResolvedSfxCue {
  cueId: string;
  triggerSeconds: number;
  /** Path relative to the project root. */
  fileRef: string;
  volume: number;
  sourceUrl?: string;
  license?: string;
}

/** Music bed after the track has been selected and timings computed. */
export interface ResolvedMusicBed {
  mood: string;
  /** Path relative to the project root. */
  trackRef: string;
  fadeInSeconds: number;
  fadeOutSeconds: number;
  sourceUrl?: string;
  license?: string;
}

/** A beat entry in the compiled timeline with resolved audio. */
export interface CompiledBeat {
  beatId: string;
  /** Derived from narration clip duration + tail padding (or authored if pinned). */
  startSeconds: number;
  endSeconds: number;
  narration?: NarrationClip;
  sfxCues: ResolvedSfxCue[];
}

/** A scene entry in the compiled timeline with resolved music + beats. */
export interface CompiledScene {
  sceneId: string;
  startSeconds: number;
  endSeconds: number;
  music?: ResolvedMusicBed;
  beats: CompiledBeat[];
}

/**
 * Compiled audio timeline — lives at `projects/<name>/audio/compiled.timeline.json`.
 * Generated (never hand-edited) by the `compile-timeline` task.
 * This is the single source of truth the Remotion composition reads for audio layout.
 */
export interface CompiledTimeline {
  /** Must match the project's `slug` in `project.config.ts`. */
  projectSlug: string;
  /** Must match one of the project's `variants[].id`. */
  variantId: string;
  /** Schema version — increment when breaking changes are made to this type. */
  version: "1";
  /** ISO 8601 timestamp of when this file was last generated. */
  compiledAt: string;
  totalDurationSeconds: number;
  scenes: CompiledScene[];
  mixing: MixingSettings;
}
