# Workout Video Generator

Generate workout timer videos for YouTube from JSON workout definitions.

## Setup

Install dependencies (first time only):

```bash
npm install
```

## Creating a Workout

### Option 1: Workout Builder Web Page (Recommended)

Open the visual workout builder in your browser:

```bash
open workout-builder.html
```

1. Search and filter exercises by name, muscle group, or equipment
2. Click **+ Add** to add exercises to your workout
3. Configure sets, reps, set duration, rest time, setup time, and timer mode for each exercise
4. Reorder exercises with the up/down arrow buttons
5. Set your workout title, subtitle, and colors in the top section
6. Click **Download JSON** and save the file into the `workouts/` folder

### Option 2: Edit JSON Directly

Copy the template and fill in your exercises:

```bash
cp workouts/TEMPLATE.json workouts/my-workout.json
```

Edit `workouts/my-workout.json` with your exercises, sets, and timing.

### Option 3: Generator Script

Edit the exercise list at the top of `create-workout.ts`, then run:

```bash
npm run create
```

This generates a JSON file in the `workouts/` folder.

## Previewing a Workout Video

Launch Remotion Studio to preview the video in your browser with a scrubbable timeline:

```bash
npm run studio
```

This opens a browser window where you can scrub through the video, inspect each phase, and see exactly how it will look before rendering.

## Rendering a Video

Render a workout JSON to MP4:

```bash
npx remotion render WorkoutVideo --props='./workouts/my-workout.json' output/my-workout.mp4
```

The video will be saved as a 1920x1080 H.264 MP4 at 30fps, ready for YouTube upload.

### Render Examples

```bash
# Render the sample workout
npx remotion render WorkoutVideo --props='./workouts/sample-full-body.json' output/sample.mp4

# Render a push day workout
npx remotion render WorkoutVideo --props='./workouts/push-day---week-1.json' output/push-day.mp4
```

## Project Structure

```
workouts/               Workout JSON definitions (your data)
  TEMPLATE.json         Blank template to copy and fill in
  sample-full-body.json Sample workout
workout-builder.html    Visual workout builder (open in browser)
create-workout.ts       Script-based workout generator
src/                    Remotion video components
output/                 Rendered MP4 files (gitignored)
```

## Video Phases

Each workout video includes these phases in order:

| Phase    | Description                                      |
|----------|--------------------------------------------------|
| Intro    | Title card with workout name and subtitle (8s)   |
| Setup    | Equipment setup instructions with countdown      |
| Exercise | Active set with timer (countdown or count-up)    |
| Rest     | Rest period countdown with "Up Next" preview     |
| Cooldown | Cool down screen with countdown                  |

A progress bar at the bottom shows overall workout progress throughout the video.
