import path from "path";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import type { WorkoutData } from "./src/types";

async function main() {
  const workoutPath = process.argv[2];

  if (!workoutPath) {
    console.error("Usage: npm run render <path-to-workout.json>");
    console.error("Example: npm run render workouts/sample-full-body.json");
    process.exit(1);
  }

  const resolvedPath = path.resolve(workoutPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  const workoutData: WorkoutData = JSON.parse(
    fs.readFileSync(resolvedPath, "utf-8")
  );

  console.log(`Rendering: ${workoutData.workout.title}`);
  console.log("Bundling project...");

  const bundleLocation = await bundle({
    entryPoint: path.resolve("./src/index.ts"),
    webpackOverride: (config) => config,
  });

  console.log("Selecting composition...");

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "WorkoutVideo",
    inputProps: workoutData,
  });

  const outputDir = path.resolve("./output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const safeTitle = workoutData.workout.title
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  const outputPath = path.join(outputDir, `${safeTitle}.mp4`);

  console.log(`Rendering to: ${outputPath}`);
  console.log(`Duration: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: workoutData,
    onProgress: ({ progress }) => {
      process.stdout.write(`\rProgress: ${(progress * 100).toFixed(1)}%`);
    },
  });

  console.log(`\nDone! Video saved to: ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
