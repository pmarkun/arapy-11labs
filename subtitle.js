// Subtitle component for displaying AI speech as dynamic captions
// Integrates with 11Labs Conversation API onMessage callback

let subtitleContainer = null;
let currentSubtitle = null;
let wordQueue = [];
let isAnimating = false;
let animationInterval = null;
let config = {
  enabled: false,
  wordsPerSecond: 3, // Average speaking speed
  fadeOutDelay: 2000, // Delay before fading out completed text
  maxLines: 2, // Maximum lines to display
  position: 'bottom', // 'bottom', 'top', 'center'
  fontSize: '2rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  textAlign: 'center',
  padding: '1rem 2rem',
  maxWidth: '80%',
};

// Initialize subtitle system
export const initSubtitles = (containerElement, customConfig = {}) => {
  config = { ...config, ...customConfig };
  
  if (!containerElement) {
    console.error('[subtitle] Container element not found');
    return;
  }

  // Create or get subtitle container
  subtitleContainer = containerElement.querySelector('.subtitle-container');
  
  if (!subtitleContainer) {
    subtitleContainer = document.createElement('div');
    subtitleContainer.className = 'subtitle-container';
    applyStyles();
    containerElement.appendChild(subtitleContainer);
  }
  
  config.enabled = true;
  console.log('[subtitle] Initialized with config:', config);
};

// Apply CSS styles to subtitle container
const applyStyles = () => {
  if (!subtitleContainer) return;
  
  const positions = {
    bottom: { bottom: '5%', top: 'auto', transform: 'translateX(-50%)' },
    top: { top: '5%', bottom: 'auto', transform: 'translateX(-50%)' },
    center: { top: '50%', bottom: 'auto', transform: 'translate(-50%, -50%)' },
  };
  
  const pos = positions[config.position] || positions.bottom;
  
  Object.assign(subtitleContainer.style, {
    position: 'absolute',
    left: '50%',
    ...pos,
    maxWidth: config.maxWidth,
    width: 'auto',
    padding: config.padding,
    backgroundColor: config.backgroundColor,
    color: config.color,
    fontSize: config.fontSize,
    fontFamily: config.fontFamily,
    textAlign: config.textAlign,
    borderRadius: '0.5rem',
    pointerEvents: 'none',
    zIndex: '1000',
    opacity: '0',
    transition: 'opacity 0.3s ease-in-out',
    wordWrap: 'break-word',
    lineHeight: '1.4',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
  });
};

// Configure subtitle system
export const configureSubtitles = (customConfig) => {
  config = { ...config, ...customConfig };
  if (subtitleContainer) {
    applyStyles();
  }
  console.log('[subtitle] Configuration updated:', config);
};

// Enable/disable subtitles
export const setSubtitlesEnabled = (enabled) => {
  config.enabled = enabled;
  if (!enabled) {
    clearSubtitles();
  }
  console.log('[subtitle] Enabled:', enabled);
};

// Main handler for conversation messages
export const handleConversationMessage = (message) => {
  if (!config.enabled || !subtitleContainer) return;
  
  console.log('[subtitle] Message received:', message);
  
  // Handle different message types from 11Labs
  if (message.type === 'conversation_initiation_metadata') {
    // Conversation started
    console.log('[subtitle] Conversation started');
  } else if (message.type === 'audio' || message.type === 'message') {
    // Audio message with transcript
    if (message.transcript || message.text) {
      const text = message.transcript || message.text;
      displaySubtitle(text);
    }
  } else if (message.message) {
    // Generic message format
    displaySubtitle(message.message);
  }
};

// Display subtitle with word-by-word animation
const displaySubtitle = (text) => {
  if (!text || !subtitleContainer) return;
  
  console.log('[subtitle] Displaying:', text);
  
  // Clear previous animation
  stopAnimation();
  
  // Split text into words
  const words = text.trim().split(/\s+/);
  wordQueue = [...words];
  
  // Clear container
  subtitleContainer.textContent = '';
  subtitleContainer.style.opacity = '1';
  
  // Start word-by-word animation
  startAnimation();
};

// Start word-by-word animation
const startAnimation = () => {
  if (isAnimating) return;
  
  isAnimating = true;
  const msPerWord = 1000 / config.wordsPerSecond;
  
  let displayedWords = [];
  
  animationInterval = setInterval(() => {
    if (wordQueue.length === 0) {
      // Animation complete
      stopAnimation();
      fadeOutAfterDelay();
      return;
    }
    
    // Add next word
    const nextWord = wordQueue.shift();
    displayedWords.push(nextWord);
    
    // Update display
    const text = displayedWords.join(' ');
    subtitleContainer.textContent = text;
    
    // Handle max lines (approximate)
    const lines = Math.ceil(displayedWords.length / 10); // Rough estimate
    if (lines > config.maxLines && wordQueue.length > 0) {
      // Shift old words out
      const wordsPerLine = Math.ceil(displayedWords.length / lines);
      displayedWords = displayedWords.slice(wordsPerLine);
    }
  }, msPerWord);
};

// Stop animation
const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
  isAnimating = false;
  wordQueue = [];
};

// Fade out subtitle after delay
const fadeOutAfterDelay = () => {
  setTimeout(() => {
    if (subtitleContainer && !isAnimating) {
      subtitleContainer.style.opacity = '0';
      setTimeout(() => {
        if (subtitleContainer && !isAnimating) {
          subtitleContainer.textContent = '';
        }
      }, 300);
    }
  }, config.fadeOutDelay);
};

// Clear all subtitles immediately
export const clearSubtitles = () => {
  stopAnimation();
  if (subtitleContainer) {
    subtitleContainer.style.opacity = '0';
    setTimeout(() => {
      if (subtitleContainer) {
        subtitleContainer.textContent = '';
      }
    }, 300);
  }
};

// Clean up subtitle system
export const destroySubtitles = () => {
  stopAnimation();
  if (subtitleContainer && subtitleContainer.parentNode) {
    subtitleContainer.parentNode.removeChild(subtitleContainer);
  }
  subtitleContainer = null;
  config.enabled = false;
  console.log('[subtitle] Destroyed');
};

// Utility: Update subtitle text instantly (no animation)
export const setSubtitleText = (text) => {
  if (!config.enabled || !subtitleContainer) return;
  
  stopAnimation();
  subtitleContainer.textContent = text;
  subtitleContainer.style.opacity = '1';
  fadeOutAfterDelay();
};
