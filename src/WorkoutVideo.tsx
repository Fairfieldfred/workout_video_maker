import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { WorkoutData } from "./types";
import { buildTimeline, findActiveSegment, getTotalDurationInFrames } from "./utils/timeline";
import { IntroScreen } from "./components/IntroScreen";
import { SetupTimer } from "./components/SetupTimer";
import { ExerciseTimer } from "./components/ExerciseTimer";
import { RestTimer } from "./components/RestTimer";
import { CooldownScreen } from "./components/CooldownScreen";
import { ProgressBar } from "./components/ProgressBar";

export const WorkoutVideo: React.FC<WorkoutData> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { primaryColor, backgroundColor } = props.workout.style;

  const segments = useMemo(() => buildTimeline(props, fps), [props, fps]);
  const totalFrames = useMemo(() => getTotalDurationInFrames(segments), [segments]);
  const segment = findActiveSegment(segments, frame);

  if (!segment) {
    return (
      <div style={{ width: "100%", height: "100%", backgroundColor }} />
    );
  }

  const overallProgress = frame / totalFrames;

  const renderSegment = () => {
    switch (segment.type) {
      case "intro":
        return (
          <IntroScreen
            title={segment.title}
            subtitle={segment.subtitle}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
          />
        );
      case "setup":
        return (
          <SetupTimer
            title={segment.title}
            instructions={segment.instructions}
            durationSeconds={segment.durationSeconds}
            segmentStartFrame={segment.startFrame}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
          />
        );
      case "exercise":
        return (
          <ExerciseTimer
            title={segment.title}
            setNumber={segment.setNumber!}
            totalSets={segment.totalSets!}
            reps={segment.reps!}
            timerMode={segment.timerMode!}
            durationSeconds={segment.durationSeconds}
            segmentStartFrame={segment.startFrame}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
          />
        );
      case "rest":
        return (
          <RestTimer
            durationSeconds={segment.durationSeconds}
            segmentStartFrame={segment.startFrame}
            nextExercise={segment.nextExercise}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
          />
        );
      case "cooldown":
        return (
          <CooldownScreen
            title={segment.title}
            durationSeconds={segment.durationSeconds}
            segmentStartFrame={segment.startFrame}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {renderSegment()}
      <ProgressBar progress={overallProgress} color={primaryColor} />
    </div>
  );
};
