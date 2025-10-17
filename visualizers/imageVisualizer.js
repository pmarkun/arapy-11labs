// Image visualization mode
export class ImageVisualizer {
  constructor(config = {}) {
    console.log('[ImageVisualizer] Constructor called with config:', config);
    this.mode = 'image';
    this.interval = config.interval || 200; // ms between frames
    this.talkImages = config.talk_images || [];
    this.idleImages = config.idle_images || [];
    this.backgroundColor = config.backgroundColor || '#000000';
    
    console.log('[ImageVisualizer] Talk images:', this.talkImages);
    console.log('[ImageVisualizer] Idle images:', this.idleImages);
    
    // Preloaded images
    this.talkImageElements = [];
    this.idleImageElements = [];
    this.imagesLoaded = false;
    this.loadingPromise = null;
    
    // Animation state
    this.currentTalkFrame = 0;
    this.lastFrameTime = 0;
    this.currentIdleImage = null;
    
    // Start preloading images
    this.preloadImages();
  }

  setup(containerElement) {
    // Setup background color for image visualizer
    if (containerElement) {
      containerElement.style.backgroundColor = this.backgroundColor;
      console.log('[ImageVisualizer] Background color configured:', this.backgroundColor);
      
      // If there's a background image class, remove it for image mode
      containerElement.classList.remove('has-bg');
      containerElement.style.removeProperty('--bg-image');
    }
  }

  async preloadImages() {
    if (this.loadingPromise) return this.loadingPromise;
    
    this.loadingPromise = new Promise(async (resolve) => {
      const loadImage = (src) => {
        return new Promise((resolveImg, rejectImg) => {
          const img = new Image();
          img.onload = () => resolveImg(img);
          img.onerror = () => {
            console.warn(`[ImageVisualizer] Failed to load image: ${src}`);
            rejectImg(new Error(`Failed to load ${src}`));
          };
          img.src = src;
        });
      };

      try {
        // Load all talk images
        console.log('[ImageVisualizer] Preloading talk images:', this.talkImages);
        const talkPromises = this.talkImages.map(src => loadImage(src).catch(() => null));
        this.talkImageElements = (await Promise.all(talkPromises)).filter(img => img !== null);
        
        // Load all idle images
        console.log('[ImageVisualizer] Preloading idle images:', this.idleImages);
        const idlePromises = this.idleImages.map(src => loadImage(src).catch(() => null));
        this.idleImageElements = (await Promise.all(idlePromises)).filter(img => img !== null);
        
        this.imagesLoaded = true;
        console.log('[ImageVisualizer] All images preloaded successfully');
        console.log(`  - Talk images: ${this.talkImageElements.length}`);
        console.log(`  - Idle images: ${this.idleImageElements.length}`);
        
        // Pick random idle image
        if (this.idleImageElements.length > 0) {
          this.currentIdleImage = this.idleImageElements[
            Math.floor(Math.random() * this.idleImageElements.length)
          ];
        }
        
        resolve();
      } catch (error) {
        console.error('[ImageVisualizer] Error preloading images:', error);
        this.imagesLoaded = true; // Mark as loaded anyway to avoid blocking
        resolve();
      }
    });
    
    return this.loadingPromise;
  }

  drawImage(ctx, canvas, img) {
    if (!ctx || !canvas || !img) return;
    
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, w, h);
    
    // Calculate scaling to fit image while maintaining aspect ratio
    const imgAspect = img.width / img.height;
    const canvasAspect = w / h;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > canvasAspect) {
      // Image is wider than canvas
      drawWidth = w;
      drawHeight = w / imgAspect;
      drawX = 0;
      drawY = (h - drawHeight) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = h;
      drawWidth = h * imgAspect;
      drawX = (w - drawWidth) / 2;
      drawY = 0;
    }
    
    // Draw image centered and scaled
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }

  draw(ctx, canvas, analyser, dataArray, activeConversation, lastSdkBins) {
    if (!this.imagesLoaded || this.talkImageElements.length === 0) {
      // Fallback: draw placeholder
      this.drawPlaceholder(ctx, canvas, 'Loading...', '#00ff80');
      return { rms: 0 };
    }
    
    const now = performance.now();
    
    // Check if it's time to advance frame
    if (now - this.lastFrameTime >= this.interval) {
      this.currentTalkFrame = (this.currentTalkFrame + 1) % this.talkImageElements.length;
      this.lastFrameTime = now;
    }
    
    const currentImage = this.talkImageElements[this.currentTalkFrame];
    this.drawImage(ctx, canvas, currentImage);
    
    // Calculate RMS for activity detection (simplified for image mode)
    let rms = 0.5; // Always consider "active" when speaking
    
    return { rms };
  }

  drawIdle(ctx, canvas, tSec) {
    if (!this.imagesLoaded) {
      // Fallback: draw placeholder
      this.drawPlaceholder(ctx, canvas, 'Loading...', '#00ff80');
      return;
    }
    
    if (this.idleImageElements.length === 0) {
      // No idle images, draw placeholder
      this.drawPlaceholder(ctx, canvas, 'Idle', '#00ff80');
      return;
    }
    
    // Draw current idle image
    if (this.currentIdleImage) {
      this.drawImage(ctx, canvas, this.currentIdleImage);
    }
    
    // Optionally, change idle image every N seconds
    // For now, we keep the same random idle image
  }

  drawPlaceholder(ctx, canvas, text, color) {
    if (!ctx || !canvas) return;
    
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, w / 2, h / 2);
  }

  // Method to change idle image (can be called externally or on timer)
  changeIdleImage() {
    if (this.idleImageElements.length > 0) {
      this.currentIdleImage = this.idleImageElements[
        Math.floor(Math.random() * this.idleImageElements.length)
      ];
    }
  }

  // Reset talk animation to first frame
  resetTalkAnimation() {
    this.currentTalkFrame = 0;
    this.lastFrameTime = performance.now();
  }
}
