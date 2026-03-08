import React from "react";

interface TimerCircleProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color: string;
  trackColor?: string;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
  progress,
  size = 300,
  strokeWidth = 10,
  color,
  trackColor = "rgba(255,255,255,0.1)",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  const center = size / 2;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};
