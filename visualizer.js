// Visualization module: canvas-based idle circle and reactive line driven by audio
import { createVisualizer } from './visualizers/registry.js';

let audioCtx = null;
let analyser = null;
let dataArray = null;
let rafId = null;
let canvas = null;
let ctx = null;
let vizMode = 'idle'; // 'idle' | 'active'
let silentGainNode = null;
const mediaSourceMap = new WeakMap(); // HTMLMediaElement -> MediaElementAudioSourceNode
const streamSourceMap = new WeakMap(); // MediaStream -> MediaStreamAudioSourceNode
const playingEls = new Set();
let activeConversation = null;
let lastSdkBins = null;

// Visualizer instance (pluggable)
let visualizerInstance = null;
let visualizerConfig = { mode: 'line', color: '#00ff80' };

// Debug helpers
let lastActive = false;
let silentFrames = 0;
const ACTIVE_THRESHOLD = 0.015; // RMS threshold
const SILENT_FRAME_LIMIT = 20; // ~0.33s at 60fps

const ensureAudioContext = async () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') {
    try { await audioCtx.resume(); } catch {}
  }
};

export const updateVisualizerMode = (mode) => {
    if (mode !== vizMode) {
        console.log('[viz] mode ->', mode);
        vizMode = mode;
    }
};

export const configureVisualizer = (config) => {
  if (config) {
    visualizerConfig = { ...visualizerConfig, ...config };
    console.log('[viz] config updated:', visualizerConfig);
    // Recreate visualizer instance with new config
    visualizerInstance = createVisualizer(visualizerConfig.mode || 'line', visualizerConfig);
  }
};

const buildAnalyserChain = (sourceNode) => {
  analyser = (audioCtx && audioCtx.createAnalyser) ? audioCtx.createAnalyser() : null;
  if (!analyser) return;
  analyser.fftSize = 2048;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  try { sourceNode.disconnect(); } catch {}
  sourceNode.connect(analyser);
  // Keep graph alive but silent
  if (!silentGainNode) {
    silentGainNode = audioCtx.createGain();
    silentGainNode.gain.value = 0.0;
    silentGainNode.connect(audioCtx.destination);
  }
  try { analyser.disconnect(); } catch {}
  analyser.connect(silentGainNode);
};

export const connectMediaEl = async (el) => {
  if (!(el instanceof HTMLMediaElement)) return;
  await ensureAudioContext();
  let source = mediaSourceMap.get(el);
  if (!source) {
    try { source = audioCtx.createMediaElementSource(el); } catch (e) { console.warn('[viz] createMediaElementSource failed', e); }
    if (source) mediaSourceMap.set(el, source);
  }
  if (source) buildAnalyserChain(source);
  try { el.crossOrigin = 'anonymous'; } catch {}
  console.log('[viz] MediaElement connected', { src: el.currentSrc || el.src });
  
  // Track play/pause events to control visualization
  el.addEventListener('play', () => {
    playingEls.add(el);
    updateVisualizerMode('line');
    console.log('[viz] element play');
  });
  const onStop = () => {
    playingEls.delete(el);
    if (playingEls.size === 0) updateVisualizerMode('idle');
    console.log('[viz] element stop/pause, playing count:', playingEls.size);
  };
  el.addEventListener('pause', onStop);
  el.addEventListener('ended', onStop);
};

export const connectMediaStream = async (stream) => {
  if (!(stream instanceof MediaStream)) return;
  await ensureAudioContext();
  let source = streamSourceMap.get(stream);
  if (!source) {
    try { source = audioCtx.createMediaStreamSource(stream); } catch (e) { console.warn('[viz] createMediaStreamSource failed', e); }
    if (source) streamSourceMap.set(stream, source);
  }
  if (source) buildAnalyserChain(source);
  updateVisualizerMode('line');
  console.log('[viz] MediaStream connected with tracks:', stream.getTracks().map(t => t.kind + ':' + t.readyState));
  stream.getTracks().forEach(t => t.addEventListener('ended', () => {
    if (stream.getTracks().every(tr => tr.readyState === 'ended')) {
      updateVisualizerMode('idle');
      console.log('[viz] stream ended');
    }
  }));
};

export const observeMediaPlayback = () => {
  const handler = async (type, target) => {
    if (!(target instanceof HTMLMediaElement)) return;
    if (type === 'play') {
      await connectMediaEl(target);
      playingEls.add(target);
      updateVisualizerMode('line');
      console.log('[viz] global play', target.tagName);
    } else {
      playingEls.delete(target);
      if (playingEls.size === 0) updateVisualizerMode('idle');
      console.log('[viz] global', type, 'playing count:', playingEls.size);
    }
  };
  document.addEventListener('play', (e) => handler('play', e.target), true);
  document.addEventListener('pause', (e) => handler('pause', e.target), true);
  document.addEventListener('ended', (e) => handler('ended', e.target), true);
};

export const hookConversationAudio = async (conv) => {
  try {
    if (!conv) return;
    // Try element
    const el = conv.audioElement || conv.audioEl || conv.audio;
    if (el instanceof HTMLMediaElement) {
      await connectMediaEl(el);
      return;
    }
    // Try stream
    const stream = conv.mediaStream || conv.outputStream || conv.remoteStream || conv.stream;
    if (stream instanceof MediaStream) {
      await connectMediaStream(stream);
      return;
    }
    // Fallback: observe DOM for media created later
    const mo = new MutationObserver((muts) => {
      muts.forEach((mut) => {
        mut.addedNodes?.forEach((n) => {
          if (n instanceof HTMLMediaElement) connectMediaEl(n);
          if (n.querySelectorAll) n.querySelectorAll('audio,video').forEach(connectMediaEl);
        });
      });
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {
    console.warn('[viz] hookConversationAudio failed', e);
  }
};

export const setActiveConversation = (conv) => {
  activeConversation = conv;
};

const initCanvas = (canvasId) => {
  canvas = document.getElementById(canvasId);
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);
};

const drawIdle = (tSec) => {
  if (!visualizerInstance) return;
  visualizerInstance.drawIdle(ctx, canvas, tSec);
};

const drawLine = () => {
  if (!visualizerInstance) return;
  
  const result = visualizerInstance.draw(ctx, canvas, analyser, dataArray, activeConversation, lastSdkBins);
  const rms = result?.rms || 0;

  // Debug: log when audio starts/stops
  const isActive = rms > ACTIVE_THRESHOLD;
  if (isActive && !lastActive) {
    console.log('[viz] audio signal detected, rms=', rms.toFixed(3));
  }
  if (!isActive) {
    silentFrames++;
    if (lastActive && silentFrames > SILENT_FRAME_LIMIT) {
      console.log('[viz] audio gone silent');
    }
  } else {
    silentFrames = 0;
  }
  lastActive = isActive;
};

export const initFullVisualizer = (canvasId = 'vizCanvas', config = null) => {
  if (config) {
    configureVisualizer(config);
  } else if (!visualizerInstance) {
    // Initialize with default config
    visualizerInstance = createVisualizer(visualizerConfig.mode, visualizerConfig);
  }
  
  initCanvas(canvasId);
  cancelAnimationFrame(rafId);
  const tick = (tMs) => {
    const tSec = tMs / 1000;
    if (vizMode === 'line') drawLine(); else drawIdle(tSec);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
};
