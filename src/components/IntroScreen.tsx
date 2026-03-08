import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface IntroScreenProps {
  title: string;
  subtitle?: string;
  primaryColor: string;
  backgroundColor: string;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  title,
  subtitle,
  primaryColor,
  backgroundColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleOpacity = interpolate(frame, [fps * 0.3, fps * 0.8], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, fps * 0.5], [30, 0], {
    extrapolateRight: "clamp",
  });

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
      <h1
        style={{
          color: "white",
          fontSize: 80,
          fontWeight: 800,
          textAlign: "center",
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: "80%",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: primaryColor,
            fontSize: 36,
            fontWeight: 500,
            marginTop: 30,
            opacity: subtitleOpacity,
            letterSpacing: 2,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
