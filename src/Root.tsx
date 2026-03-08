import React from "react";
import { Composition } from "remotion";
import { WorkoutVideo } from "./WorkoutVideo";
import type { WorkoutData } from "./types";
import { buildTimeline, getTotalDurationInFrames } from "./utils/timeline";
import sampleWorkout from "../workouts/sample-full-body.json";

const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

const calculateDuration = (props: WorkoutData) => {
  const segments = buildTimeline(props, FPS);
  return getTotalDurationInFrames(segments);
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WorkoutVideo"
        component={WorkoutVideo}
        durationInFrames={calculateDuration(sampleWorkout as WorkoutData)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={sampleWorkout as WorkoutData}
      />
    </>
  );
};
