// Subtitle component for displaying AI speech as dynamic captions
// Integrates with 11Labs Conversation API onMessage callback

let subtitleContainer = null;
let currentSubtitle = null;
let blockQueue = []; // Queue of text blocks
let currentBlockWords = []; // Words in current block
let displayedWords = []; // Words already displayed
let isAnimating = false;
let animationInterval = null;
let blockTimeout = null;

// Default configuration
const defaultConfig = {
  enabled: true,
  wordsPerSecond: 3, // Average speaking speed
  fadeOutDelay: 2000, // Delay before fading out completed text
  maxLines: 2, // Maximum lines to display
  maxCharsPerLine: 40, // Approximate characters per line for breaking
  blockDuration: 3000, // Duration to show each block before moving to next
  position: 'bottom', // 'bottom', 'top', 'center'
  fontSize: '2rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  textAlign: 'center',
  padding: '1rem 2rem',
  maxWidth: '80%',
};

let config = { ...defaultConfig };

// Initialize subtitle system
export const initSubtitles = (containerElement, customConfig = {}) => {
  // Merge with defaults (customConfig overrides defaults)
  config = { ...defaultConfig, ...customConfig };
  
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
  
  // Filter out user messages - only show AI responses
  // Check if message is from user
  if (message.source === 'user' || message.role === 'user' || message.from === 'user') {
    console.log('[subtitle] Ignoring user message');
    return;
  }
  
  // Handle different message types from 11Labs
  if (message.type === 'conversation_initiation_metadata') {
    // Conversation started
    console.log('[subtitle] Conversation started');
  } else if (message.type === 'audio' || message.type === 'message') {
    // Audio message with transcript - only if from agent/assistant
    if ((message.source === 'ai' || message.source === 'agent' || message.role === 'assistant' || !message.source) && (message.transcript || message.text)) {
      const text = message.transcript || message.text;
      displaySubtitle(text);
    }
  } else if (message.message && (message.source === 'ai' || message.source === 'agent' || !message.source)) {
    // Generic message format from AI
    displaySubtitle(message.message);
  }
};

// Break text into blocks that fit within maxLines
const breakIntoBlocks = (text) => {
  const words = text.trim().split(/\s+/);
  const blocks = [];
  const maxCharsPerBlock = config.maxCharsPerLine * config.maxLines;
  
  let currentBlock = [];
  let currentLength = 0;
  
  for (const word of words) {
    const wordLength = word.length + 1; // +1 for space
    
    // Check if word ends with sentence-ending punctuation
    const endsWithPunctuation = /[.!?]$/.test(word);
    
    // If adding this word exceeds the limit, start a new block
    if (currentLength + wordLength > maxCharsPerBlock && currentBlock.length > 0) {
      blocks.push(currentBlock.join(' '));
      currentBlock = [word];
      currentLength = wordLength;
    } else {
      currentBlock.push(word);
      currentLength += wordLength;
      
      // If word ends with punctuation, complete the block (unless it would be too small)
      if (endsWithPunctuation && currentLength >= config.maxCharsPerLine * 0.5) {
        blocks.push(currentBlock.join(' '));
        currentBlock = [];
        currentLength = 0;
      }
    }
  }
  
  // Add the last block if not empty
  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join(' '));
  }
  
  return blocks;
};

// Display subtitle in blocks
const displaySubtitle = (text) => {
  if (!text || !subtitleContainer) return;
  
  console.log('[subtitle] Displaying:', text);
  
  // Clear previous animation
  stopAnimation();
  
  // Break text into blocks
  blockQueue = breakIntoBlocks(text);
  console.log('[subtitle] Blocks:', blockQueue);
  
  // Start displaying blocks
  displayNextBlock();
};

// Display next block in queue with word-by-word animation
const displayNextBlock = () => {
  if (blockQueue.length === 0) {
    // All blocks displayed
    fadeOutAfterDelay();
    return;
  }
  
  // Get next block
  const blockText = blockQueue.shift();
  currentBlockWords = blockText.split(/\s+/);
  displayedWords = [];
  
  console.log('[subtitle] Showing block:', blockText);
  
  // Clear container and prepare for animation
  subtitleContainer.textContent = '';
  subtitleContainer.style.opacity = '1';
  
  // Start word-by-word animation
  isAnimating = true;
  const msPerWord = 1000 / config.wordsPerSecond;
  
  animationInterval = setInterval(() => {
    if (currentBlockWords.length === 0) {
      // Block complete, stop animation
      clearInterval(animationInterval);
      animationInterval = null;
      isAnimating = false;
      
      // Calculate remaining time for this block
      const wordCount = displayedWords.length;
      const animationDuration = wordCount * msPerWord;
      const minDuration = config.blockDuration;
      const remainingTime = Math.max(0, minDuration - animationDuration);
      
      // Schedule next block or fade out
      if (blockTimeout) clearTimeout(blockTimeout);
      blockTimeout = setTimeout(() => {
        if (blockQueue.length > 0) {
          displayNextBlock();
        } else {
          fadeOutAfterDelay();
        }
      }, remainingTime);
      return;
    }
    
    // Add next word
    const nextWord = currentBlockWords.shift();
    displayedWords.push(nextWord);
    
    // Update display
    subtitleContainer.textContent = displayedWords.join(' ');
  }, msPerWord);
};

// Stop animation
const stopAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
  if (blockTimeout) {
    clearTimeout(blockTimeout);
    blockTimeout = null;
  }
  isAnimating = false;
  blockQueue = [];
  currentBlockWords = [];
  displayedWords = [];
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
