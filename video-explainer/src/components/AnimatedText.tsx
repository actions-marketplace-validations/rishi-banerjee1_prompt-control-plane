import React from 'react';
import {interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';
import {theme} from '../theme';

export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({children, delay = 0, duration = 20, style}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame - delay, [0, duration], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{opacity, transform: `translateY(${y}px)`, ...style}}>
      {children}
    </div>
  );
};

export const TypeWriter: React.FC<{
  text: string;
  startFrame?: number;
  speed?: number;
  style?: React.CSSProperties;
}> = ({text, startFrame = 0, speed = 2, style}) => {
  const frame = useCurrentFrame();
  const charsVisible = Math.min(
    text.length,
    Math.max(0, Math.floor((frame - startFrame) / speed))
  );
  return (
    <span style={{fontFamily: "'JetBrains Mono', monospace", ...style}}>
      {text.slice(0, charsVisible)}
      {charsVisible < text.length && (
        <span
          style={{
            opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
            color: theme.accent,
          }}
        >
          |
        </span>
      )}
    </span>
  );
};

export const ScaleIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({children, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {damping: 12, stiffness: 200},
  });
  return (
    <div style={{transform: `scale(${scale})`, transformOrigin: 'center'}}>
      {children}
    </div>
  );
};

export const Counter: React.FC<{
  from: number;
  to: number;
  startFrame?: number;
  duration?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({from, to, startFrame = 0, duration = 30, suffix = '', style}) => {
  const frame = useCurrentFrame();
  const value = interpolate(frame - startFrame, [0, duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <span style={style}>{Math.round(value)}{suffix}</span>;
};

export const GlowText: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, color = theme.primary, style}) => {
  return (
    <span
      style={{
        color,
        textShadow: `0 0 20px ${color}66, 0 0 40px ${color}33`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
