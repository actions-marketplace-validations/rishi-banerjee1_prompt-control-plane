import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../theme';

export const Terminal: React.FC<{
  lines: Array<{text: string; color?: string; delay: number}>;
  title?: string;
  width?: number;
  style?: React.CSSProperties;
}> = ({lines, title = 'Terminal', width = 900, style}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: '#1a1a2e',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{width: 12, height: 12, borderRadius: '50%', background: '#f87171'}} />
        <div style={{width: 12, height: 12, borderRadius: '50%', background: '#fbbf24'}} />
        <div style={{width: 12, height: 12, borderRadius: '50%', background: '#34d399'}} />
        <span
          style={{
            marginLeft: 12,
            color: theme.textMuted,
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {title}
        </span>
      </div>
      {/* Content */}
      <div
        style={{
          background: theme.codeBg,
          padding: '20px 24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 18,
          lineHeight: 1.8,
          minHeight: 200,
        }}
      >
        {lines.map((line, i) => {
          const charsVisible = Math.max(
            0,
            Math.floor((frame - line.delay) * 1.5)
          );
          if (frame < line.delay) return null;
          return (
            <div key={i} style={{color: line.color || theme.codeText}}>
              {line.text.slice(0, charsVisible)}
              {charsVisible < line.text.length && (
                <span style={{opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0, color: theme.accent}}>
                  _
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CodeBlock: React.FC<{
  code: string;
  language?: string;
  highlightLines?: number[];
  style?: React.CSSProperties;
}> = ({code, language = 'bash', highlightLines = [], style}) => {
  const lines = code.split('\n');
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${theme.border}`,
        boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
        ...style,
      }}
    >
      <div
        style={{
          background: '#1a1a2e',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{width: 10, height: 10, borderRadius: '50%', background: '#f87171'}} />
        <div style={{width: 10, height: 10, borderRadius: '50%', background: '#fbbf24'}} />
        <div style={{width: 10, height: 10, borderRadius: '50%', background: '#34d399'}} />
        <span style={{marginLeft: 8, color: theme.textDim, fontSize: 12}}>{language}</span>
      </div>
      <div
        style={{
          background: theme.codeBg,
          padding: '16px 20px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          lineHeight: 1.7,
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color: highlightLines.includes(i)
                ? theme.accent
                : theme.codeText,
              background: highlightLines.includes(i)
                ? 'rgba(34, 211, 238, 0.08)'
                : 'transparent',
              padding: '0 4px',
              borderRadius: 4,
            }}
          >
            <span style={{color: theme.textDim, marginRight: 16, userSelect: 'none'}}>
              {String(i + 1).padStart(2, ' ')}
            </span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};
