import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { TimerCircle } from "./TimerCircle";
import { formatTime } from "../utils/format";

interface ExerciseTimerProps {
  title: string;
  setNumber: number;
  totalSets: number;
  reps: number;
  timerMode: "countdown" | "countup";
  durationSeconds: number;
  segmentStartFrame: number;
  primaryColor: string;
  backgroundColor: string;
}

export const ExerciseTimer: React.FC<ExerciseTimerProps> = ({
  title,
  setNumber,
  totalSets,
  reps,
  timerMode,
  durationSeconds,
  segmentStartFrame,
  primaryColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = (frame - segmentStartFrame) / fps;
  const remaining = Math.max(0, durationSeconds - elapsed);
  const progress = elapsed / durationSeconds;

  const displayTime =
    timerMode === "countdown"
      ? formatTime(remaining)
      : formatTime(elapsed);

  const isEnding = timerMode === "countdown" && remaining <= 5 && remaining > 0;
  const pulseScale = isEnding
    ? 1 + 0.04 * Math.sin(elapsed * Math.PI * 3)
    : 1;

  const timerColor = isEnding ? "#FF3B30" : primaryColor;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          color: primaryColor,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        EXERCISE
      </div>

      <h2
        style={{
          color: "white",
          fontSize: 60,
          fontWeight: 800,
          margin: 0,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 28,
          marginBottom: 40,
        }}
      >
        Set {setNumber} of {totalSets} &middot; {reps} reps
      </div>

      <div style={{ position: "relative", marginBottom: 30 }}>
        <TimerCircle
          progress={progress}
          color={timerColor}
          size={320}
          strokeWidth={12}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: isEnding ? "#FF3B30" : "white",
              fontSize: 88,
              fontWeight: 800,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {displayTime}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 18,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginTop: 4,
            }}
          >
            {timerMode === "countdown" ? "remaining" : "elapsed"}
          </div>
        </div>
      </div>
    </div>
  );
};
