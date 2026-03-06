#!/usr/bin/env node
/**
 * Generates two royalty-free background music tracks via pure math synthesis.
 * Track 1: "Gentle Flow" — soft, ambient piano-like tones (~75s, replaces Ballerina)
 * Track 2: "Bright Steps" — upbeat, peppy synth melody (~110s, replaces Happy Toes)
 *
 * Zero dependencies. Zero watermarks. Pure math → WAV.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SAMPLE_RATE = 44100;

// ─── WAV Writer ──────────────────────────────────────────────────────────────

function writeWav(filepath, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);        // PCM
  buffer.writeUInt16LE(1, 22);        // mono
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), 44 + i * 2);
  }

  writeFileSync(filepath, buffer);
  const mb = (buffer.length / 1024 / 1024).toFixed(1);
  const sec = (numSamples / SAMPLE_RATE).toFixed(1);
  console.log(`  ✓ ${filepath} (${mb} MB, ${sec}s)`);
}

// ─── Synthesis Primitives ────────────────────────────────────────────────────

const TWO_PI = 2 * Math.PI;

function sine(freq, t) {
  return Math.sin(TWO_PI * freq * t);
}

function triangle(freq, t) {
  const p = (freq * t) % 1;
  return 4 * Math.abs(p - 0.5) - 1;
}

/** Soft piano-like tone with harmonics and exponential decay */
function pianoTone(freq, t, dur) {
  const attack = Math.min(t / 0.008, 1);
  const decay = Math.exp(-t * 3.5 / dur);
  const env = attack * decay;
  return env * (
    sine(freq, t) +
    0.35 * sine(freq * 2, t) * Math.exp(-t * 5 / dur) +
    0.12 * sine(freq * 3, t) * Math.exp(-t * 7 / dur) +
    0.04 * sine(freq * 4, t) * Math.exp(-t * 9 / dur)
  ) * 0.45;
}

/** Bright synth pad with subtle detune for stereo width */
function synthPad(freq, t, dur) {
  const attack = Math.min(t / 0.04, 1);
  const release = t > dur - 0.08 ? Math.max(0, (dur - t) / 0.08) : 1;
  const env = attack * release;
  return env * (
    triangle(freq, t) * 0.45 +
    0.2 * sine(freq * 2.005, t) +
    0.12 * sine(freq * 0.5, t)
  ) * 0.35;
}

/** Staccato pluck for bouncy melodies */
function pluck(freq, t, dur) {
  const attack = Math.min(t / 0.004, 1);
  const decay = Math.exp(-t * 6 / dur);
  const env = attack * decay;
  return env * (
    sine(freq, t) +
    0.45 * sine(freq * 2, t) * Math.exp(-t * 8 / dur) +
    0.2 * sine(freq * 3, t) * Math.exp(-t * 11 / dur)
  ) * 0.35;
}

// ─── Note Frequencies ────────────────────────────────────────────────────────

const NOTES = {};
const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
for (let oct = 2; oct <= 6; oct++) {
  for (let i = 0; i < 12; i++) {
    const midi = (oct + 1) * 12 + i;
    NOTES[`${NAMES[i]}${oct}`] = 440 * Math.pow(2, (midi - 69) / 12);
  }
}
const n = (name) => NOTES[name] || 440;

// ─── Helper: render note into buffer ─────────────────────────────────────────

function renderNote(samples, startSec, durSec, freq, synthFn, gain) {
  const s0 = Math.floor(startSec * SAMPLE_RATE);
  const s1 = Math.min(Math.floor((startSec + durSec) * SAMPLE_RATE), samples.length);
  for (let s = s0; s < s1; s++) {
    const t = (s - s0) / SAMPLE_RATE;
    samples[s] += synthFn(freq, t, durSec) * gain;
  }
}

// ─── Track 1: Gentle Flow (75s) ─────────────────────────────────────────────
// Soft ambient piano with slow arpeggiated chords — dreamy, calm

function generateGentleFlow() {
  const duration = 75;
  const samples = new Float64Array(SAMPLE_RATE * duration);
  const BPM = 68;
  const beat = 60 / BPM;
  const bar = beat * 4;

  // Jazz-tinged progression: Cmaj7 → Am7 → Dm7 → G7 → Em7 → Am7 → Fmaj7 → G7
  const chords = [
    ['C3', 'E3', 'G3', 'B3'],
    ['A2', 'C3', 'E3', 'G3'],
    ['D3', 'F3', 'A3', 'C4'],
    ['G2', 'B2', 'D3', 'F3'],
    ['E3', 'G3', 'B3', 'D4'],
    ['A2', 'C3', 'E3', 'G3'],
    ['F2', 'A2', 'C3', 'E3'],
    ['G2', 'B2', 'D3', 'F3'],
  ];

  // Gentle melody — sparse, lyrical
  const melodies = [
    [null, 'E4', null, 'G4'],
    ['A4', null, 'E4', null],
    [null, 'F4', 'A4', null],
    ['G4', null, null, 'D4'],
    [null, 'B4', null, 'G4'],
    ['A4', null, 'C4', null],
    [null, 'A3', null, 'E4'],
    ['D4', null, 'G4', null],
  ];

  for (let rep = 0; rep < Math.ceil(duration / (bar * chords.length)); rep++) {
    for (let ci = 0; ci < chords.length; ci++) {
      const barStart = (rep * chords.length + ci) * bar;
      if (barStart >= duration) break;

      // Arpeggiated chord (soft piano)
      chords[ci].forEach((note, ni) => {
        renderNote(samples, barStart + ni * 0.18, bar - ni * 0.18, n(note), pianoTone, 0.3);
      });

      // Sparse melody
      melodies[ci].forEach((note, bi) => {
        if (!note) return;
        renderNote(samples, barStart + bi * beat, beat * 0.85, n(note), pianoTone, 0.5);
      });
    }
  }

  // Gentle sub-bass warmth
  for (let s = 0; s < samples.length; s++) {
    const t = s / SAMPLE_RATE;
    const barIdx = Math.floor(t / bar) % chords.length;
    const bassNote = chords[barIdx][0]; // root
    const bassFreq = n(bassNote) * 0.5; // one octave below
    samples[s] += 0.06 * sine(bassFreq, t) * (0.7 + 0.3 * sine(0.08, t));
  }

  // Fade in (3s) / fade out (5s)
  for (let s = 0; s < samples.length; s++) {
    const t = s / SAMPLE_RATE;
    samples[s] *= Math.min(t / 3, 1) * Math.min((duration - t) / 5, 1);
  }

  return samples;
}

// ─── Track 2: Bright Steps (110s) ───────────────────────────────────────────
// Upbeat, peppy synth with bouncy eighth-note melody and rhythmic pulse

function generateBrightSteps() {
  const duration = 110;
  const samples = new Float64Array(SAMPLE_RATE * duration);
  const BPM = 118;
  const beat = 60 / BPM;
  const bar = beat * 4;
  const eighth = beat / 2;

  // Pop I-V-vi-IV progression
  const chords = [
    ['C3', 'E3', 'G3'],   // C
    ['G2', 'B2', 'D3'],   // G
    ['A2', 'C3', 'E3'],   // Am
    ['F2', 'A2', 'C3'],   // F
    ['C3', 'E3', 'G3'],   // C
    ['G2', 'B2', 'D3'],   // G
    ['F2', 'A2', 'C3'],   // F
    ['G2', 'B2', 'D3'],   // G (turnaround)
  ];

  // Bouncy eighth-note melodies
  const melodies = [
    ['C4', 'E4', 'G4', 'E4', 'C5', null, 'G4', 'E4'],
    ['B3', 'D4', 'G4', 'D4', 'B4', null, 'G4', 'D4'],
    ['A3', 'C4', 'E4', 'C4', 'A4', null, 'E4', 'C4'],
    ['F3', 'A3', 'C4', 'F4', 'A4', null, 'C4', 'A3'],
    ['E4', 'G4', 'C5', 'G4', 'E4', null, 'C4', 'G4'],
    ['D4', 'G4', 'B4', 'G4', 'D4', null, 'B3', 'G3'],
    ['F3', 'A3', 'C4', 'F4', null, 'C4', 'A3', 'F3'],
    ['G3', 'B3', 'D4', 'G4', 'B4', null, 'D4', 'B3'],
  ];

  for (let rep = 0; rep < Math.ceil(duration / (bar * chords.length)); rep++) {
    for (let ci = 0; ci < chords.length; ci++) {
      const barStart = (rep * chords.length + ci) * bar;
      if (barStart >= duration) break;

      // Synth pad chords
      for (const note of chords[ci]) {
        renderNote(samples, barStart, bar, n(note), synthPad, 0.3);
      }

      // Bouncy pluck melody
      melodies[ci].forEach((note, ei) => {
        if (!note) return;
        renderNote(samples, barStart + ei * eighth, eighth * 0.7, n(note), pluck, 0.55);
      });

      // Kick-style pulse on beats 1 and 3
      for (const b of [0, 2]) {
        const kickStart = barStart + b * beat;
        const ks = Math.floor(kickStart * SAMPLE_RATE);
        const ke = Math.min(ks + Math.floor(0.07 * SAMPLE_RATE), samples.length);
        for (let s = ks; s < ke; s++) {
          const t = (s - ks) / SAMPLE_RATE;
          samples[s] += sine(80 * Math.exp(-t * 30), t) * Math.exp(-t * 25) * 0.22;
        }
      }

      // Hi-hat-like noise on every eighth note for groove
      for (let ei = 0; ei < 8; ei++) {
        const hatStart = barStart + ei * eighth;
        const hs = Math.floor(hatStart * SAMPLE_RATE);
        const he = Math.min(hs + Math.floor(0.02 * SAMPLE_RATE), samples.length);
        for (let s = hs; s < he; s++) {
          const t = (s - hs) / SAMPLE_RATE;
          const noise = (Math.random() * 2 - 1);
          // Bandpass-ish: multiply by high-freq sine
          samples[s] += noise * sine(8000, t) * Math.exp(-t * 80) * 0.04;
        }
      }
    }
  }

  // Fade in (2s) / fade out (4s)
  for (let s = 0; s < samples.length; s++) {
    const t = s / SAMPLE_RATE;
    samples[s] *= Math.min(t / 2, 1) * Math.min((duration - t) / 4, 1);
  }

  return samples;
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('Generating watermark-free background music...\n');

const outDir = join(__dirname, '..', 'public', 'music');
mkdirSync(outDir, { recursive: true });

console.log('Track 1: Gentle Flow (soft ambient piano, ~75s)');
const gentle = generateGentleFlow();
writeWav(join(outDir, 'gentle-flow.wav'), gentle);

console.log('\nTrack 2: Bright Steps (upbeat peppy synth, ~110s)');
const bright = generateBrightSteps();
writeWav(join(outDir, 'bright-steps.wav'), bright);

console.log('\nDone! Pure math synthesis — zero watermarks, zero licenses.');
