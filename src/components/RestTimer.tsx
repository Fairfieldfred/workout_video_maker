import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { TimerCircle } from "./TimerCircle";
import { formatTime } from "../utils/format";

interface RestTimerProps {
  durationSeconds: number;
  segmentStartFrame: number;
  nextExercise?: string;
  primaryColor: string;
  backgroundColor: string;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  durationSeconds,
  segmentStartFrame,
  nextExercise,
  primaryColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = (frame - segmentStartFrame) / fps;
  const remaining = Math.max(0, durationSeconds - elapsed);
  const progress = elapsed / durationSeconds;

  const isEnding = remaining <= 5 && remaining > 0;
  const pulseScale = isEnding
    ? 1 + 0.04 * Math.sin(elapsed * Math.PI * 3)
    : 1;

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
          color: "#4ECDC4",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
          marginBottom: 50,
        }}
      >
        REST
      </div>

      <div style={{ position: "relative", marginBottom: 50 }}>
        <TimerCircle
          progress={progress}
          color={isEnding ? "#FF3B30" : "#4ECDC4"}
          size={300}
          strokeWidth={10}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            color: isEnding ? "#FF3B30" : "white",
            fontSize: 80,
            fontWeight: 800,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(remaining)}
        </div>
      </div>

      {nextExercise && (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 10,
            }}
          >
            Up Next
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            {nextExercise}
          </div>
        </div>
      )}
    </div>
  );
};
