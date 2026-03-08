import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
          backgroundColor: color,
          transition: "none",
        }}
      />
    </div>
  );
};
