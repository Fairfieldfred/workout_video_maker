import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { TimerCircle } from "./TimerCircle";
import { formatTime } from "../utils/format";

interface SetupTimerProps {
  title: string;
  instructions?: string;
  durationSeconds: number;
  segmentStartFrame: number;
  primaryColor: string;
  backgroundColor: string;
}

export const SetupTimer: React.FC<SetupTimerProps> = ({
  title,
  instructions,
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

  const pulseScale =
    remaining <= 5 && remaining > 0
      ? 1 + 0.03 * Math.sin(elapsed * Math.PI * 2)
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
          color: primaryColor,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        GET READY
      </div>

      <h2
        style={{
          color: "white",
          fontSize: 56,
          fontWeight: 700,
          margin: 0,
          marginBottom: 40,
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        {title}
      </h2>

      <div style={{ position: "relative", marginBottom: 40 }}>
        <TimerCircle progress={progress} color={primaryColor} size={280} />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(remaining)}
        </div>
      </div>

      {instructions && (
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 28,
            maxWidth: "60%",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          {instructions}
        </p>
      )}
    </div>
  );
};
