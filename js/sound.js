/**
 * Generates a crack/snap sound using Web Audio API.
 * No external audio files needed.
 */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playCrackSound() {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  const now = ctx.currentTime;

  // Layer 1: Sharp click (noise burst)
  const bufferSize = ctx.sampleRate * 0.08;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.4, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 1500;

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noiseSource.start(now);

  // Layer 2: Low thud
  const thudOsc = ctx.createOscillator();
  thudOsc.type = 'sine';
  thudOsc.frequency.setValueAtTime(150, now);
  thudOsc.frequency.exponentialRampToValueAtTime(50, now + 0.1);

  const thudGain = ctx.createGain();
  thudGain.gain.setValueAtTime(0.3, now);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  thudOsc.connect(thudGain);
  thudGain.connect(ctx.destination);
  thudOsc.start(now);
  thudOsc.stop(now + 0.1);

  // Layer 3: Secondary crack (delayed)
  const crack2Size = ctx.sampleRate * 0.04;
  const crack2Buffer = ctx.createBuffer(1, crack2Size, ctx.sampleRate);
  const crack2Data = crack2Buffer.getChannelData(0);
  for (let i = 0; i < crack2Size; i++) {
    crack2Data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / crack2Size, 5);
  }

  const crack2Source = ctx.createBufferSource();
  crack2Source.buffer = crack2Buffer;

  const crack2Gain = ctx.createGain();
  crack2Gain.gain.setValueAtTime(0.25, now + 0.05);
  crack2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  crack2Source.connect(crack2Gain);
  crack2Gain.connect(ctx.destination);
  crack2Source.start(now + 0.05);
}
