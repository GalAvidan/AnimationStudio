import type { Pose } from "@studio/adapter-motion-canvas/rig";

export const friendPresets: Record<string, Pose> = {
  neutral: {
    mouth_neutral: { swap: "mouth_neutral" },
    brow_left:  { rotation: 0 },
    brow_right: { rotation: 0 },
  },
  happy: {
    mouth_neutral: { swap: "mouth_smile" },
    brow_left:  { rotation: -8 },
    brow_right: { rotation: 8 },
  },
  worried: {
    mouth_neutral: { swap: "mouth_frown" },
    brow_left:  { rotation: 14 },
    brow_right: { rotation: -14 },
  },
};
