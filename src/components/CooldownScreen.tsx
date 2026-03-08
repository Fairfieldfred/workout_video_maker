import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { TimerCircle } from "./TimerCircle";
import { formatTime } from "../utils/format";

interface CooldownScreenProps {
  title: string;
  durationSeconds: number;
  segmentStartFrame: number;
  primaryColor: string;
  backgroundColor: string;
}

export const CooldownScreen: React.FC<CooldownScreenProps> = ({
  title,
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
          color: "#7ED957",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        COOL DOWN
      </div>

      <h2
        style={{
          color: "white",
          fontSize: 52,
          fontWeight: 700,
          margin: 0,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        {title}
      </h2>

      <div style={{ position: "relative" }}>
        <TimerCircle progress={progress} color="#7ED957" size={260} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(remaining)}
        </div>
      </div>
    </div>
  );
};
