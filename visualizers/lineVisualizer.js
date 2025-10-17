// Line visualization mode
export class LineVisualizer {
  constructor(config = {}) {
    this.color = config.color || '#00ff80';
    this.shadowBlur = config.shadowBlur || 16;
    this.lineWidth = config.lineWidth || 3;
    this.backgroundImage = config.backgroundImage || null;
  }

  setup(containerElement) {
    // Setup background image for line visualizer
    if (containerElement && this.backgroundImage) {
      containerElement.style.setProperty('--bg-image', `url('${this.backgroundImage}')`);
      containerElement.classList.add('has-bg');
      console.log('[LineVisualizer] Background image configured:', this.backgroundImage);
    }
  }

  draw(ctx, canvas, analyser, dataArray, activeConversation, lastSdkBins) {
    if (!ctx || !canvas) return;
    
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = this.shadowBlur;
    const midY = Math.floor(h / 2);

    let rms = 0;
    if (analyser && dataArray) {
      analyser.getByteTimeDomainData(dataArray);
      // Remove DC offset to keep center exactly at midY
      let mean = 0;
      for (let i = 0; i < dataArray.length; i++) mean += dataArray[i];
      mean /= dataArray.length; // around 128, but measured live
      const step = w / dataArray.length;
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const centered = (dataArray[i] - mean) / 128; // now ~-1..1 around 0
        const x = i * step;
        const y = midY + centered * (h * 0.22);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        sum += centered * centered;
      }
      rms = Math.sqrt(sum / dataArray.length);
    } else if (activeConversation?.getOutputByteFrequencyData) {
      try {
        const res = activeConversation.getOutputByteFrequencyData();
        if (res && typeof res.then === 'function') {
          res.then((bins) => { lastSdkBins = bins; }).catch(() => {});
        } else if (res instanceof Uint8Array) {
          lastSdkBins = res;
        }
      } catch {}

      const bins = lastSdkBins;
      const len = bins?.length || 0;
      if (len > 0) {
        // Center bins by subtracting their average so graph oscillates equally
        let avg = 0;
        for (let i = 0; i < len; i++) avg += bins[i];
        avg /= len || 1;
        const step = w / len;
        let sum = 0;
        for (let i = 0; i < len; i++) {
          const centered = (bins[i] - avg) / 255; // roughly -0.5..0.5
          const x = i * step;
          const y = midY + centered * 2 * (h * 0.22); // scale to ~-1..1
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          sum += centered * centered;
        }
        rms = Math.sqrt(sum / len) / 1.1; // rough normalization
      }
    }

    ctx.stroke();
    return { rms };
  }

  drawIdle(ctx, canvas, tSec) {
    if (!ctx || !canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.min(w, h) * 0.12;
    const r = base * (1 + 0.06 * Math.sin(tSec * 2 * Math.PI * 0.9));
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}
