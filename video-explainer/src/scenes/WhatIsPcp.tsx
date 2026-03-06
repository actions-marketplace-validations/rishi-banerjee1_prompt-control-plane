import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {theme, FPS} from '../theme';
import {FadeIn, GlowText, ScaleIn} from '../components/AnimatedText';

export const WhatIsPcp: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{background: theme.bg}}>
      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${theme.border}22 1px, transparent 1px), linear-gradient(90deg, ${theme.border}22 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Logo / title reveal */}
      <Sequence from={0} durationInFrames={FPS * 15}>
        <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <ScaleIn delay={5}>
            <div style={{
              fontSize: 28,
              color: theme.primary,
              letterSpacing: 6,
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: 20,
            }}>
              Introducing
            </div>
          </ScaleIn>
          <FadeIn delay={15}>
            <div style={{fontSize: 88, fontWeight: 900, color: theme.white, textAlign: 'center'}}>
              Prompt Control Plane
            </div>
          </FadeIn>
          <FadeIn delay={30}>
            <div style={{fontSize: 32, color: theme.textMuted, marginTop: 20, textAlign: 'center', maxWidth: 800}}>
              Deterministic prompt governance for AI applications
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Three pillars */}
      <Sequence from={FPS * 12} durationInFrames={FPS * 20}>
        <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80}}>
          <FadeIn delay={0}>
            <div style={{fontSize: 42, fontWeight: 700, color: theme.white, marginBottom: 60, textAlign: 'center'}}>
              What makes it different
            </div>
          </FadeIn>

          <div style={{display: 'flex', gap: 40, justifyContent: 'center'}}>
            <Pillar
              icon="0"
              title="Zero LLM Calls"
              desc="All scoring, routing, and analysis is pure deterministic logic. No API costs inside the engine."
              delay={FPS * 1}
              color={theme.accent}
            />
            <Pillar
              icon="15"
              title="15 CLI Commands"
              desc="preflight, optimize, check, score, benchmark, and 10 more. Full governance from the terminal."
              delay={FPS * 2}
              color={theme.primary}
            />
            <Pillar
              icon="20"
              title="20 MCP Tools"
              desc="Deep integration with Claude, Cursor, and any MCP-compatible AI assistant."
              delay={FPS * 3}
              color={theme.accentGreen}
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Architecture flow */}
      <Sequence from={FPS * 30} durationInFrames={FPS * 30}>
        <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 80}}>
          <FadeIn delay={0}>
            <div style={{fontSize: 36, fontWeight: 700, color: theme.white, marginBottom: 50, textAlign: 'center'}}>
              How It Works
            </div>
          </FadeIn>

          <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <FlowBox label="Your Prompt" color={theme.textMuted} delay={FPS * 1} />
            <Arrow delay={FPS * 2} />
            <FlowBox label="PCP Engine" color={theme.primary} delay={FPS * 3} subtitle="Score + Classify + Route" />
            <Arrow delay={FPS * 4} />
            <FlowBox label="Decision" color={theme.accent} delay={FPS * 5} subtitle="Model + Risk + Issues" />
            <Arrow delay={FPS * 6} />
            <FlowBox label="LLM" color={theme.accentGreen} delay={FPS * 7} subtitle="Right model, right prompt" />
          </div>

          <FadeIn delay={FPS * 10} style={{marginTop: 50}}>
            <div style={{
              background: `${theme.primary}15`,
              border: `1px solid ${theme.primary}33`,
              borderRadius: 12,
              padding: '20px 40px',
              fontSize: 22,
              color: theme.text,
              textAlign: 'center',
              maxWidth: 700,
            }}>
              PCP sits <GlowText color={theme.accent}>before</GlowText> the LLM — like a linter for your prompts.
              Deterministic, reproducible, zero cost per analysis.
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const Pillar: React.FC<{
  icon: string;
  title: string;
  desc: string;
  delay: number;
  color: string;
}> = ({icon, title, desc, delay, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame: frame - delay, fps, config: {damping: 14}});
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: 20,
        padding: '40px 32px',
        width: 340,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 56, fontWeight: 900, color, marginBottom: 16}}>{icon}</div>
      <div style={{fontSize: 26, fontWeight: 700, color: theme.white, marginBottom: 12}}>{title}</div>
      <div style={{fontSize: 18, color: theme.textMuted, lineHeight: 1.5}}>{desc}</div>
    </div>
  );
};

const FlowBox: React.FC<{
  label: string;
  color: string;
  delay: number;
  subtitle?: string;
}> = ({label, color, delay, subtitle}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame: frame - delay, fps, config: {damping: 12}});
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        background: theme.bgCard,
        border: `2px solid ${color}66`,
        borderRadius: 16,
        padding: '24px 28px',
        textAlign: 'center',
        minWidth: 180,
      }}
    >
      <div style={{fontSize: 22, fontWeight: 700, color}}>{label}</div>
      {subtitle && (
        <div style={{fontSize: 14, color: theme.textMuted, marginTop: 8}}>{subtitle}</div>
      )}
    </div>
  );
};

const Arrow: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div style={{opacity, fontSize: 28, color: theme.textDim}}>
      &#10132;
    </div>
  );
};
