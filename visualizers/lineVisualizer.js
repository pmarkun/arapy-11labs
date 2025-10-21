// Line visualization mode
export class LineVisualizer {
  constructor(config = {}) {
    this.color = config.color || '#00ff80';
    this.shadowBlur = config.shadowBlur || 16;
    this.lineWidth = config.lineWidth || 3;
    this.backgroundImage = config.backgroundImage || null;
    this.backgroundOpacity = config.backgroundOpacity !== undefined ? config.backgroundOpacity : 0.5;
  }

  setup(containerElement) {
    // Setup background image for line visualizer
    if (containerElement && this.backgroundImage) {
      containerElement.style.setProperty('--bg-image', `url('${this.backgroundImage}')`);
      containerElement.style.setProperty('--bg-opacity', this.backgroundOpacity);
      containerElement.classList.add('has-bg');
      console.log('[LineVisualizer] Background image configured:', this.backgroundImage, 'opacity:', this.backgroundOpacity);
    }
  }

  draw(ctx, canvas, analyser, dataArray, activeConversation, lastSdkBins) {
    if (!ctx || !canvas) return { rms: 0 };
    
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
    
    // Strategy 1: Try to use the SDK's built-in getOutputByteFrequencyData() method
    if (activeConversation?.getOutputByteFrequencyData) {
      try {
        const frequencyData = activeConversation.getOutputByteFrequencyData();
        if (frequencyData && frequencyData.length > 0) {
          // Convert frequency data to waveform-like visualization
          const step = w / frequencyData.length;
          let sum = 0;
          
          for (let i = 0; i < frequencyData.length; i++) {
            const normalized = frequencyData[i] / 255; // 0..1
            const x = i * step;
            // Create wave effect from frequency data
            const amplitude = normalized * (h * 0.3);
            const y = midY + (Math.sin(i * 0.1) * amplitude) - (amplitude / 2);
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            
            sum += normalized * normalized;
          }
          
          rms = Math.sqrt(sum / frequencyData.length);
          ctx.stroke();
          return { rms };
        }
      } catch (e) {
        console.warn('[LineVisualizer] getOutputByteFrequencyData failed:', e);
      }
    }
    
    // Strategy 2: Use external analyser if provided (fallback)
    if (analyser && dataArray) {
      analyser.getByteTimeDomainData(dataArray);
      
      // Remove DC offset to keep center exactly at midY
      let mean = 0;
      for (let i = 0; i < dataArray.length; i++) mean += dataArray[i];
      mean /= dataArray.length;
      
      const step = w / dataArray.length;
      let sum = 0;
      
      for (let i = 0; i < dataArray.length; i++) {
        const centered = (dataArray[i] - mean) / 128; // -1..1 around 0
        const x = i * step;
        const y = midY + centered * (h * 0.22);
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        
        sum += centered * centered;
      }
      
      rms = Math.sqrt(sum / dataArray.length);
      ctx.stroke();
      return { rms };
    }
    
    // Strategy 3: Draw flat line if no data available
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();
    
    return { rms: 0 };
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

