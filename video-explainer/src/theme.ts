// PCP brand theme — dark-first, matches getpcp.site
export const theme = {
  bg: '#0a0a1a',
  bgCard: '#12122a',
  primary: '#7c5cfc',
  primaryLight: '#a78bfa',
  accent: '#22d3ee',
  accentGreen: '#34d399',
  accentRed: '#f87171',
  accentYellow: '#fbbf24',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  border: '#1e293b',
  codeBg: '#1a1a2e',
  codeText: '#e2e8f0',
  white: '#ffffff',
  gradientPrimary: 'linear-gradient(135deg, #7c5cfc, #22d3ee)',
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene durations in seconds
export const SCENE_DURATIONS = {
  hook: 30,        // 0:00 - 0:30
  whatIsPcp: 60,   // 0:30 - 1:30
  powerhouses: 60, // 1:30 - 2:30
  ciIntegration: 60, // 2:30 - 3:30
  adoption: 60,    // 3:30 - 4:30
  closing: 30,     // 4:30 - 5:00
} as const;

export const TOTAL_DURATION_FRAMES =
  Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) * FPS; // 9000
