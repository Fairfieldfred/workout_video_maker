export interface WorkoutStyle {
  primaryColor: string;
  backgroundColor: string;
  fontFamily?: string;
}

export interface IntroPhase {
  type: "intro";
  title: string;
  subtitle?: string;
  duration: number;
}

export interface SetupPhase {
  type: "setup";
  title: string;
  instructions?: string;
  duration: number;
}

export interface SetConfig {
  setNumber: number;
  reps: number;
  timerMode: "countdown" | "countup";
  duration?: number;
  estimatedDuration?: number;
  rest?: number;
}

export interface ExercisePhase {
  type: "exercise";
  title: string;
  sets: SetConfig[];
}

export interface CooldownPhase {
  type: "cooldown";
  title: string;
  duration: number;
}

export type Phase = IntroPhase | SetupPhase | ExercisePhase | CooldownPhase;

export interface WorkoutData {
  [key: string]: unknown;
  workout: {
    title: string;
    style: WorkoutStyle;
  };
  phases: Phase[];
}

export type SegmentType = "intro" | "setup" | "exercise" | "rest" | "cooldown";

export interface Segment {
  type: SegmentType;
  startFrame: number;
  durationInFrames: number;
  title: string;
  subtitle?: string;
  instructions?: string;
  setNumber?: number;
  totalSets?: number;
  reps?: number;
  timerMode?: "countdown" | "countup";
  durationSeconds: number;
  nextExercise?: string;
}
