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
import {FadeIn, GlowText, ScaleIn, TypeWriter} from '../components/AnimatedText';
import {Terminal} from '../components/Terminal';

export const Adoption: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: theme.bg}}>
      {/* Section title */}
      <Sequence from={0} durationInFrames={FPS * 8}>
        <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <FadeIn delay={5}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: 28, color: theme.accentYellow, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20}}>
                Get Started in 30 Seconds
              </div>
              <div style={{fontSize: 64, fontWeight: 800, color: theme.white}}>
                Three Ways to Adopt
              </div>
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Method 1: MCP */}
      <Sequence from={FPS * 7} durationInFrames={FPS * 18}>
        <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60}}>
          <FadeIn delay={0}>
            <div style={{textAlign: 'center', marginBottom: 8}}>
              <StepIndicator step={1} total={3} />
              <div style={{fontSize: 36, fontWeight: 700, color: theme.white, marginBottom: 8}}>
                MCP Integration
              </div>
              <div style={{fontSize: 20, color: theme.textMuted, marginBottom: 24}}>
                Add to Claude Desktop, Cursor, or any MCP client
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={FPS * 2}>
            <Terminal
              title=".mcp.json"
              width={850}
              lines={[
                {text: '{', color: theme.textDim, delay: FPS * 1},
                {text: '  "mcpServers": {', color: theme.text, delay: FPS * 1.5},
                {text: '    "pcp": {', color: theme.accent, delay: FPS * 2},
                {text: '      "command": "npx",', color: theme.text, delay: FPS * 2.5},
                {text: '      "args": ["-y", "pcp-engine"]', color: theme.accentGreen, delay: FPS * 3},
                {text: '    }', color: theme.text, delay: FPS * 3.5},
                {text: '  }', color: theme.text, delay: FPS * 4},
                {text: '}', color: theme.textDim, delay: FPS * 4.5},
              ]}
            />
          </FadeIn>
          <FadeIn delay={FPS * 8} style={{marginTop: 24}}>
            <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
              <MethodChip label="pre_flight" desc="instant quality check" />
              <MethodChip label="optimize_prompt" desc="full compilation" />
              <MethodChip label="route_model" desc="cost-aware routing" />
              <MethodChip label="+16 more" desc="governance tools" />
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Method 2: CLI */}
      <Sequence from={FPS * 22} durationInFrames={FPS * 18}>
        <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60}}>
          <FadeIn delay={0}>
            <div style={{textAlign: 'center', marginBottom: 8}}>
              <StepIndicator step={2} total={3} />
              <div style={{fontSize: 36, fontWeight: 700, color: theme.white, marginBottom: 8}}>
                CLI
              </div>
              <div style={{fontSize: 20, color: theme.textMuted, marginBottom: 24}}>
                One install. Works everywhere.
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={FPS * 2}>
            <Terminal
              title="terminal"
              width={850}
              lines={[
                {text: '$ npm install -g pcp-engine', color: theme.textMuted, delay: FPS * 1},
                {text: '', delay: FPS * 3},
                {text: '$ pcp preflight "Deploy to prod"', color: theme.textMuted, delay: FPS * 4},
                {text: '  PQS: 58/100  Risk: medium', color: theme.accentYellow, delay: FPS * 6},
                {text: '  Model: sonnet  Savings: 62%', color: theme.accentGreen, delay: FPS * 7},
                {text: '', delay: FPS * 8},
                {text: '$ pcp hook install', color: theme.textMuted, delay: FPS * 9},
                {text: '  Hook installed. Every prompt auto-checked.', color: theme.accent, delay: FPS * 11},
              ]}
            />
          </FadeIn>
          <FadeIn delay={FPS * 12} style={{marginTop: 24}}>
            <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
              <MethodChip label="preflight" desc="one-call analysis" />
              <MethodChip label="check" desc="pass/fail gate" />
              <MethodChip label="benchmark" desc="regression testing" />
              <MethodChip label="hook install" desc="auto-check" />
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>

      {/* Method 3: API */}
      <Sequence from={FPS * 40} durationInFrames={FPS * 20}>
        <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60}}>
          <FadeIn delay={0}>
            <div style={{textAlign: 'center', marginBottom: 8}}>
              <StepIndicator step={3} total={3} />
              <div style={{fontSize: 36, fontWeight: 700, color: theme.white, marginBottom: 8}}>
                Programmatic API
              </div>
              <div style={{fontSize: 20, color: theme.textMuted, marginBottom: 24}}>
                Embed governance in your backend
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={FPS * 2}>
            <Terminal
              title="app.ts"
              width={850}
              lines={[
                {text: "import { validate } from 'pcp-engine/validate';", color: theme.accent, delay: FPS * 1},
                {text: '', delay: FPS * 2},
                {text: 'const { pass, score, issues } = validate(prompt);', color: theme.text, delay: FPS * 3},
                {text: '', delay: FPS * 4},
                {text: 'if (!pass) throw new PromptQualityError(issues);', color: theme.accentRed, delay: FPS * 5},
              ]}
            />
          </FadeIn>
          <FadeIn delay={FPS * 8} style={{marginTop: 30}}>
            <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap'}}>
              <IntegrationBadge name="LangChain" />
              <IntegrationBadge name="OpenAI SDK" />
              <IntegrationBadge name="Express / Fastify" />
              <IntegrationBadge name="Any Node.js Backend" />
            </div>
          </FadeIn>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const StepIndicator: React.FC<{step: number; total: number}> = ({step, total}) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: `${theme.primary}20`,
    border: `1px solid ${theme.primary}44`,
    borderRadius: 8,
    padding: '6px 14px',
    marginBottom: 16,
  }}>
    <span style={{fontSize: 14, fontWeight: 700, color: theme.primary}}>
      {step} / {total}
    </span>
  </div>
);

const MethodChip: React.FC<{label: string; desc: string}> = ({label, desc}) => (
  <div style={{
    background: theme.bgCard,
    border: `1px solid ${theme.border}`,
    borderRadius: 12,
    padding: '12px 20px',
    textAlign: 'center',
  }}>
    <div style={{fontSize: 16, fontWeight: 700, color: theme.accent, fontFamily: "'JetBrains Mono', monospace"}}>{label}</div>
    <div style={{fontSize: 13, color: theme.textMuted, marginTop: 4}}>{desc}</div>
  </div>
);

const IntegrationBadge: React.FC<{name: string}> = ({name}) => (
  <div style={{
    background: theme.bgCard,
    border: `1px solid ${theme.border}`,
    borderRadius: 12,
    padding: '12px 24px',
    fontSize: 18,
    color: theme.text,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  }}>
    <span style={{color: theme.accentGreen, fontSize: 18}}>&#10003;</span>
    {name}
  </div>
);
