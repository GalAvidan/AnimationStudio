import type { Pose } from "@studio/adapter-motion-canvas/rig";

export const curiousPresets: Record<string, Pose> = {
  neutral: {
    brow_left:       { rotation: 0 },
    brow_right:      { rotation: 0 },
    eye_left:        { scale: 1 },
    eye_right:       { scale: 1 },
    mouth_neutral:   { opacity: 1 },
    mouth_surprised: { opacity: 0 },
    mouth_smile:     { opacity: 0 },
  },
  curious: {
    brow_left:       { rotation: -12 },  // inner corner raised → puzzled
    brow_right:      { rotation: 12 },
    eye_left:        { scale: 1 },
    eye_right:       { scale: 1 },
    mouth_neutral:   { opacity: 1 },
    mouth_surprised: { opacity: 0 },
    mouth_smile:     { opacity: 0 },
  },
  surprised: {
    brow_left:       { rotation: -18 },  // brows high
    brow_right:      { rotation: 18 },
    eye_left:        { scale: 1.3 },     // eyes wide
    eye_right:       { scale: 1.3 },
    mouth_neutral:   { opacity: 0 },
    mouth_surprised: { opacity: 1 },     // open O mouth
    mouth_smile:     { opacity: 0 },
  },
  happy: {
    brow_left:       { rotation: -6 },
    brow_right:      { rotation: 6 },
    eye_left:        { scale: 1 },
    eye_right:       { scale: 1 },
    mouth_neutral:   { opacity: 0 },
    mouth_surprised: { opacity: 0 },
    mouth_smile:     { opacity: 1 },     // smile arc
  },
};
