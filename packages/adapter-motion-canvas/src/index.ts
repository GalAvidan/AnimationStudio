import type {
  RenderAdapter,
  ProjectPath,
  PreviewServer,
  RenderOptions,
  RenderResult,
  SyncPointMap,
} from "@studio/adapter-contract";
import type { BeatTimeline } from "@studio/spec-types";
import { execSync, spawn } from "node:child_process";
import * as path from "node:path";

export const motionCanvasAdapter: RenderAdapter = {
  name: "motion-canvas",

  capabilities: {
    dimensions: "2d",
    audio: true,
    vector: true,
  },

  async preview(project: ProjectPath): Promise<PreviewServer> {
    const projectName = path.basename(project);
    const child = spawn(
      "pnpm",
      ["--filter", `./projects/${projectName}`, "dev"],
      { stdio: "inherit", shell: true }
    );

    // Wait briefly for the dev server to start before returning
    await new Promise<void>((resolve) => setTimeout(resolve, 2000));

    return {
      url: "http://localhost:9000",
      stop: () =>
        new Promise<void>((resolve) => {
          child.kill();
          resolve();
        }),
    };
  },

  async render(project: ProjectPath, opts: RenderOptions): Promise<RenderResult> {
    const projectName = path.basename(project);
    const start = Date.now();

    execSync(
      `pnpm --filter ./projects/${projectName} build`,
      { stdio: "inherit" }
    );

    return {
      outputPath: opts.outputPath,
      durationMs: Date.now() - start,
    };
  },

  resolveSyncPoints(timeline: BeatTimeline): SyncPointMap {
    const map: SyncPointMap = {};
    for (const sp of timeline.syncPoints) {
      map[sp.id] = Math.round(sp.time * timeline.fps);
    }
    return map;
  },
};
