/**
 * Workout Generator Script
 *
 * Generates a full workout JSON from a simple definition.
 *
 * Usage:
 *   npx tsx create-workout.ts
 *
 * Edit the workout definition below, then run the script.
 * It will output a JSON file in workouts/.
 */

import fs from "fs";
import path from "path";

// ============================================================
// EDIT YOUR WORKOUT HERE
// ============================================================

const TITLE = "Push Day - Week 1";
const SUBTITLE = "45 min | Intermediate";
const INTRO_DURATION = 8;       // seconds for intro title card
const COOLDOWN_DURATION = 60;   // seconds for cooldown at end

// Colors: change these to customize the look
const PRIMARY_COLOR = "#FF6B35"; // accent color (orange)
const BACKGROUND_COLOR = "#1A1A2E"; // dark blue-black

// Define your exercises below.
// Each exercise has:
//   name          - exercise name shown on screen
//   setupTime     - seconds to set up equipment (0 to skip setup screen)
//   setupNote     - instructions shown during setup (optional)
//   sets          - number of sets
//   reps          - reps per set
//   setDuration   - seconds per set (timer length)
//   restBetween   - seconds rest between sets
//   restAfter     - seconds rest after last set before next exercise (0 for none)
//   timerMode     - "countdown" (timer counts down) or "countup" (timer counts up)

const exercises = [
  {
    name: "Barbell Bench Press",
    setupTime: 30,
    setupNote: "Set bench to flat. Load working weight on barbell.",
    sets: 4,
    reps: 8,
    setDuration: 30,
    restBetween: 90,
    restAfter: 60,
    timerMode: "countdown" as const,
  },
  {
    name: "Incline Dumbbell Press",
    setupTime: 30,
    setupNote: "Set bench to 30-degree incline. Grab dumbbells.",
    sets: 3,
    reps: 10,
    setDuration: 35,
    restBetween: 75,
    restAfter: 60,
    timerMode: "countdown" as const,
  },
  {
    name: "Overhead Press",
    setupTime: 20,
    setupNote: "Load barbell on rack at shoulder height.",
    sets: 3,
    reps: 8,
    setDuration: 25,
    restBetween: 90,
    restAfter: 60,
    timerMode: "countdown" as const,
  },
  {
    name: "Lateral Raises",
    setupTime: 0,
    setupNote: "",
    sets: 3,
    reps: 15,
    setDuration: 30,
    restBetween: 60,
    restAfter: 0,
    timerMode: "countdown" as const,
  },
];

// ============================================================
// END OF WORKOUT DEFINITION - don't edit below this line
// ============================================================

interface Phase {
  type: string;
  title: string;
  subtitle?: string;
  duration?: number;
  instructions?: string;
  sets?: {
    setNumber: number;
    reps: number;
    timerMode: "countdown" | "countup";
    duration: number;
    rest: number;
  }[];
}

const phases: Phase[] = [];

// Intro
phases.push({
  type: "intro",
  title: TITLE,
  subtitle: SUBTITLE,
  duration: INTRO_DURATION,
});

// Exercises
for (let i = 0; i < exercises.length; i++) {
  const ex = exercises[i];

  // Setup phase (skip if setupTime is 0)
  if (ex.setupTime > 0) {
    phases.push({
      type: "setup",
      title: `Set Up For ${ex.name}`,
      instructions: ex.setupNote || undefined,
      duration: ex.setupTime,
    });
  }

  // Exercise phase with sets
  const sets = [];
  for (let s = 1; s <= ex.sets; s++) {
    const isLastSet = s === ex.sets;
    let rest: number;
    if (isLastSet) {
      rest = ex.restAfter ?? 0;
    } else {
      rest = ex.restBetween;
    }

    sets.push({
      setNumber: s,
      reps: ex.reps,
      timerMode: ex.timerMode,
      duration: ex.setDuration,
      rest,
    });
  }

  phases.push({
    type: "exercise",
    title: ex.name,
    sets,
  });
}

// Cooldown
phases.push({
  type: "cooldown",
  title: "Cool Down & Stretch",
  duration: COOLDOWN_DURATION,
});

// Build output
const workout = {
  workout: {
    title: TITLE,
    style: {
      primaryColor: PRIMARY_COLOR,
      backgroundColor: BACKGROUND_COLOR,
    },
  },
  phases,
};

// Calculate total duration for display
let totalSeconds = INTRO_DURATION + COOLDOWN_DURATION;
for (const ex of exercises) {
  totalSeconds += ex.setupTime;
  totalSeconds += ex.sets * ex.setDuration;
  totalSeconds += (ex.sets - 1) * ex.restBetween;
  totalSeconds += ex.restAfter ?? 0;
}
const totalMin = Math.floor(totalSeconds / 60);
const totalSec = totalSeconds % 60;

// Write file
const safeTitle = TITLE.replace(/[^a-zA-Z0-9\s-]/g, "")
  .replace(/\s+/g, "-")
  .toLowerCase();
const outputPath = path.join("workouts", `${safeTitle}.json`);

fs.writeFileSync(outputPath, JSON.stringify(workout, null, 2) + "\n");

console.log(`Workout created: ${outputPath}`);
console.log(`  Title:      ${TITLE}`);
console.log(`  Exercises:  ${exercises.length}`);
console.log(`  Total sets: ${exercises.reduce((sum, e) => sum + e.sets, 0)}`);
console.log(`  Duration:   ${totalMin}m ${totalSec}s`);
console.log(`\nTo preview:  npm run studio`);
console.log(`To render:   npx remotion render WorkoutVideo --props='./${outputPath}' output/${safeTitle}.mp4`);
