import type { WorkoutData, Segment, Phase } from "../types";

export function buildTimeline(data: WorkoutData, fps: number): Segment[] {
  const segments: Segment[] = [];
  let currentFrame = 0;

  for (let i = 0; i < data.phases.length; i++) {
    const phase = data.phases[i];

    if (phase.type === "intro") {
      const frames = phase.duration * fps;
      segments.push({
        type: "intro",
        startFrame: currentFrame,
        durationInFrames: frames,
        title: phase.title,
        subtitle: phase.subtitle,
        durationSeconds: phase.duration,
      });
      currentFrame += frames;
    } else if (phase.type === "setup") {
      const frames = phase.duration * fps;
      segments.push({
        type: "setup",
        startFrame: currentFrame,
        durationInFrames: frames,
        title: phase.title,
        instructions: phase.instructions,
        durationSeconds: phase.duration,
      });
      currentFrame += frames;
    } else if (phase.type === "exercise") {
      const totalSets = phase.sets.length;
      for (const set of phase.sets) {
        const setDuration = set.duration ?? set.estimatedDuration ?? 30;
        const setFrames = setDuration * fps;
        segments.push({
          type: "exercise",
          startFrame: currentFrame,
          durationInFrames: setFrames,
          title: phase.title,
          setNumber: set.setNumber,
          totalSets,
          reps: set.reps,
          timerMode: set.timerMode,
          durationSeconds: setDuration,
        });
        currentFrame += setFrames;

        if (set.rest && set.rest > 0) {
          const restFrames = set.rest * fps;
          const nextExercise = findNextExerciseName(data.phases, i, set, phase);
          segments.push({
            type: "rest",
            startFrame: currentFrame,
            durationInFrames: restFrames,
            title: "Rest",
            durationSeconds: set.rest,
            nextExercise,
          });
          currentFrame += restFrames;
        }
      }
    } else if (phase.type === "cooldown") {
      const frames = phase.duration * fps;
      segments.push({
        type: "cooldown",
        startFrame: currentFrame,
        durationInFrames: frames,
        title: phase.title,
        durationSeconds: phase.duration,
      });
      currentFrame += frames;
    }
  }

  return segments;
}

function findNextExerciseName(
  phases: Phase[],
  currentPhaseIndex: number,
  currentSet: { setNumber: number },
  currentPhase: Phase
): string | undefined {
  if (currentPhase.type === "exercise") {
    const isLastSet = currentSet.setNumber === currentPhase.sets.length;
    if (!isLastSet) {
      return `${currentPhase.title} - Set ${currentSet.setNumber + 1}`;
    }
  }
  for (let j = currentPhaseIndex + 1; j < phases.length; j++) {
    const next = phases[j];
    if (next.type === "exercise") return next.title;
    if (next.type === "setup") return next.title;
    if (next.type === "cooldown") return next.title;
  }
  return undefined;
}

export function getTotalDurationInFrames(segments: Segment[]): number {
  if (segments.length === 0) return 0;
  const last = segments[segments.length - 1];
  return last.startFrame + last.durationInFrames;
}

export function findActiveSegment(
  segments: Segment[],
  frame: number
): Segment | null {
  for (const seg of segments) {
    if (frame >= seg.startFrame && frame < seg.startFrame + seg.durationInFrames) {
      return seg;
    }
  }
  return null;
}
