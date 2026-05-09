import "./index.css";
import { Composition } from "remotion";
import { HowAiChatWorksDev } from "./compositions/HowAiChatWorksDev";
import { HowAiChatWorksGeneral } from "./compositions/HowAiChatWorksGeneral";
import { HowAiChatWorksTechnical } from "./compositions/HowAiChatWorksTechnical";
import { FPS, TOTAL_FRAMES } from "./data/beats";
import { FPS_DEV, TOTAL_FRAMES_DEV } from "./data/beats-dev";
import { FPS_TECH, TOTAL_FRAMES_TECH } from "./data/beats-technical";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HowAiChatWorks-General"
        component={HowAiChatWorksGeneral}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="HowAiChatWorks-Dev"
        component={HowAiChatWorksDev}
        durationInFrames={TOTAL_FRAMES_DEV}
        fps={FPS_DEV}
        width={1920}
        height={1080}
      />
      <Composition
        id="HowAiChatWorks-Technical"
        component={HowAiChatWorksTechnical}
        durationInFrames={TOTAL_FRAMES_TECH}
        fps={FPS_TECH}
        width={1920}
        height={1080}
      />
    </>
  );
};
