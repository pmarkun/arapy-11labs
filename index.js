// Importa o Conversation do pacote @11labs/client
 import { Conversation } from '@11labs/client';
 import { initFullVisualizer, observeMediaPlayback, hookConversationAudio, connectMediaEl, setActiveConversation, updateVisualizerMode, configureVisualizer} from './visualizer.js';
 import { initSubtitles, handleConversationMessage, configureSubtitles, clearSubtitles, setSubtitlesEnabled } from './subtitle.js';

 const startBtn = document.getElementById('startBtn');
 const stopBtn = document.getElementById('stopBtn');
 const statusEl = document.getElementById('status');
 let conversationInstance = null;
 let audio = null;
// Visualizer state is managed in visualizer.js

// on page load: check for name and id parameters in url, then set the <span id=name> object


const urlParams = new URLSearchParams(window.location.search);
let config = {
    name: urlParams.get('name'),
    agentId: urlParams.get('id'),
    mode: urlParams.get('mode') || 'card', // 'card', 'fullscreen', or 'painel'
    visualizationMode: urlParams.get('visualization') || null,
    subtitlesEnabled: urlParams.get('subtitles') !== null ? (urlParams.get('subtitles') === 'true' || urlParams.get('subtitles') === '1') : null,
}

console.log('Initial config from URL params:', config);

//try to load  a {name}.json from the server and merge with URL params
const loadConfig = async () => {
  // Store URL parameters before loading JSON
  const urlMode = urlParams.get('mode') || 'card';
  const urlVisualization = urlParams.get('visualization');
  const urlSubtitles = config.subtitlesEnabled;
  
  if (!config.agentId) {
      try {
          const response = await fetch(`./agents/${config.name}.json`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          
          // Merge JSON data with URL parameters (URL params have priority)
          config = {
            ...data,
            mode: urlMode,
            visualizationMode: urlVisualization || data.defaultVisualization
          };
          
          // Override subtitles.enabled if URL parameter is provided
          if (urlSubtitles !== null && config.subtitles) {
            config.subtitles.enabled = urlSubtitles;
          }
          
          console.log('Config loaded and merged:', config);

      } catch (error) {
          console.error('Error loading config:', error);
      }
  }

  document.getElementById('name').textContent = config.name;

  if (!config.agentId) {
      const startBtn = document.getElementById('startBtn');
      startBtn.disabled = true;
      startBtn.innerText = "Agente não encontrado!";
  }
  
  // Validate visualization configuration if provided
  if (config.mode === 'fullscreen' || config.mode === 'painel') {
    const vizError = validateVisualizationConfig();
    if (vizError) {
      showError(vizError);
      return;
    }
  }
  
  // Initialize display mode after config is loaded
  if (config.mode === 'painel') {
    initializePainelMode();
  } else if (config.mode === 'fullscreen') {
    initializeFullscreenMode();
  }
};

// Function to validate visualization configuration
const validateVisualizationConfig = () => {
  // Check if visualizations object exists
  if (!config.visualizations || typeof config.visualizations !== 'object') {
    return 'Erro: Configuração de visualizações não encontrada no JSON do agente.';
  }
  
  // Get the visualization mode from URL or default
  const vizMode = config.visualizationMode || config.defaultVisualization;
  
  if (!vizMode) {
    return 'Erro: Nenhum modo de visualização especificado. Use o parâmetro ?visualization=<modo> na URL.';
  }
  
  // Check if the requested visualization exists
  if (!config.visualizations[vizMode]) {
    const availableModes = Object.keys(config.visualizations).join(', ');
    return `Erro: Visualização "${vizMode}" não encontrada. Modos disponíveis: ${availableModes}`;
  }
  
  const vizConfig = config.visualizations[vizMode];
  
  // Validate required parameters based on mode
  if (!vizConfig.mode) {
    return `Erro: Parâmetro "mode" ausente na configuração da visualização "${vizMode}".`;
  }
  
  // Mode-specific validation
  if (vizConfig.mode === 'image') {
    if (!vizConfig.talk_images || !Array.isArray(vizConfig.talk_images) || vizConfig.talk_images.length === 0) {
      return `Erro: Parâmetro "talk_images" ausente ou inválido na visualização "${vizMode}".`;
    }
    if (!vizConfig.idle_images || !Array.isArray(vizConfig.idle_images) || vizConfig.idle_images.length === 0) {
      return `Erro: Parâmetro "idle_images" ausente ou inválido na visualização "${vizMode}".`;
    }
  }
  
  return null; // No errors
};

// Function to show error on screen
const showError = (errorMessage) => {
  const cardEl = document.getElementById('card');
  const fullModeEl = document.getElementById('fullMode');
  
  // Hide both card and fullscreen mode
  if (cardEl) cardEl.classList.add('hidden');
  if (fullModeEl) fullModeEl.classList.add('hidden');
  
  // Create error overlay
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed inset-0 bg-red-900 flex items-center justify-center p-8';
  errorDiv.innerHTML = `
    <div class="bg-white rounded-lg shadow-2xl p-8 max-w-2xl">
      <h1 class="text-3xl font-bold text-red-600 mb-4">⚠️ Erro de Configuração</h1>
      <p class="text-gray-800 text-lg mb-6">${errorMessage}</p>
      <div class="text-sm text-gray-600">
        <p class="mb-2"><strong>Dicas:</strong></p>
        <ul class="list-disc list-inside space-y-1">
          <li>Verifique se o JSON do agente possui o objeto "visualizations"</li>
          <li>Use ?visualization=<modo> na URL para especificar o modo</li>
          <li>Certifique-se de que todos os parâmetros necessários estão configurados</li>
        </ul>
      </div>
    </div>
  `;
  document.body.appendChild(errorDiv);
};

// Função para inicializar modo fullscreen
const initializeFullscreenMode = () => {
  const cardEl = document.getElementById('card');
  const fullModeEl = document.getElementById('fullMode');
  
  if (config.mode === 'fullscreen') {
    console.log('[fullscreen] Initializing fullscreen mode');
    // Hide card, show overlay
    if (cardEl) cardEl.classList.add('hidden');
    if (fullModeEl) fullModeEl.classList.remove('hidden');
    
    // Get visualization mode from URL or default
    const vizMode = config.visualizationMode || config.defaultVisualization;
    
    // Get the specific visualization config
    const vizConfig = config.visualizations[vizMode];
    console.log('[fullscreen] Using visualization mode:', vizMode);
    console.log('[fullscreen] Visualizer config:', vizConfig);
    
    // Add backgroundImage to visualizer config if mode is 'line' and backgroundImage exists
    if (vizConfig.mode === 'line' && config.backgroundImage) {
      vizConfig.backgroundImage = config.backgroundImage;
    }
    
    initFullVisualizer('vizCanvas', vizConfig, fullModeEl);
    observeMediaPlayback();
    
    // Initialize subtitles (uses defaults if no config provided)
    const subtitlesConfig = config.subtitles || {};
    // Check if enabled (default is true, can be overridden by JSON or URL)
    const subtitlesEnabled = subtitlesConfig.enabled !== false;
    
    if (subtitlesEnabled) {
      initSubtitles(fullModeEl, subtitlesConfig);
      console.log('[fullscreen] Subtitles initialized');
    } else {
      console.log('[fullscreen] Subtitles disabled');
    }
    
    // Click anywhere to start/stop
    fullModeEl.addEventListener('click', async () => {
      if (!conversationInstance) {
        await startConversation();
      } else {
        await endConversation();
      }
    });
    
    // Idle by default
    updateVisualizerMode('idle');
  }
};

// Função para inicializar modo painel (384x768 LED panel)
const initializePainelMode = () => {
  const cardEl = document.getElementById('card');
  const painelModeEl = document.getElementById('painelMode');
  
  if (config.mode === 'painel') {
    console.log('[painel] Initializing painel mode (384x768)');
    // Hide card, show painel
    if (cardEl) cardEl.classList.add('hidden');
    if (painelModeEl) painelModeEl.classList.remove('hidden');
    
    // Get visualization mode from URL or default
    const vizMode = config.visualizationMode || config.defaultVisualization;
    
    // Get the specific visualization config
    const vizConfig = config.visualizations[vizMode];
    console.log('[painel] Using visualization mode:', vizMode);
    console.log('[painel] Visualizer config:', vizConfig);
    
    // Add backgroundImage to visualizer config if mode is 'line' and backgroundImage exists
    if (vizConfig.mode === 'line' && config.backgroundImage) {
      vizConfig.backgroundImage = config.backgroundImage;
    }
    
    initFullVisualizer('painelCanvas', vizConfig, painelModeEl);
    observeMediaPlayback();
    
    // Initialize subtitles (uses defaults if no config provided)
    const subtitlesConfig = config.subtitles || {};
    // Check if enabled (default is true, can be overridden by JSON or URL)
    const subtitlesEnabled = subtitlesConfig.enabled !== false;
    
    if (subtitlesEnabled) {
      initSubtitles(painelModeEl, subtitlesConfig);
      console.log('[painel] Subtitles initialized');
    } else {
      console.log('[painel] Subtitles disabled');
    }
    
    // Click anywhere to start/stop
    painelModeEl.addEventListener('click', async () => {
      if (!conversationInstance) {
        await startConversation();
      } else {
        await endConversation();
      }
    });
    
    // Idle by default
    updateVisualizerMode('idle');
  }
};

loadConfig();

 // Função para atualizar o status na interface
 const updateStatus = (status) => {
   statusEl.textContent = "Status: " + status;
 };

 // Função para iniciar a conversa
 async function startConversation() {
   try {
     // Primeiro, solicite acesso ao microfone e explique o porquê ao usuário
     await navigator.mediaDevices.getUserMedia({ audio: true });
     updateStatus('Microfone liberado');

    //Play an mp3 file and wait for it to finish
      if (config.startAudio) {

       startBtn.classList.add('hidden');
       stopBtn.classList.remove('hidden');

       audio = new Audio(config.startAudio);
       try { audio.crossOrigin = 'anonymous'; } catch {}
       if (config.mode === 'fullscreen' || config.mode === 'painel') {
         await connectMediaEl(audio);
         updateVisualizerMode('active');
       }
        audio.play();
        updateStatus('Reproduzindo áudio de boas-vindas');
        await new Promise((resolve) => {
          audio.onended = () => {
            if (config.mode === 'fullscreen' || config.mode === 'painel') updateVisualizerMode('idle');
            resolve();
          };
        });  
      }
      
     // Inicia a sessão de conversa com o agente
     //Parse o ID do agente a partir da URL, parametro id
     conversationInstance = await Conversation.startSession({
       agentId: config.agentId,
       // Callbacks opcionais:
       onConnect: () => {
         console.log('Conectado ao agente!');
         updateStatus('Conectado');
       },
       onDisconnect: () => {
         console.log('Conexão encerrada.');
         updateStatus('Desconectado');
       },
       onMessage: (message) => {
         console.log('Mensagem recebida:', message);
         
         // Handle subtitles if enabled (check if not explicitly disabled)
         const subtitlesEnabled = config.subtitles ? config.subtitles.enabled !== false : true;
         if (subtitlesEnabled) {
           handleConversationMessage(message);
         }
       },
       onError: (error) => {
         console.error('Erro na sessão:', error);
         updateStatus('Erro');
       },
       onStatusChange: (status) => {
         console.log('Status alterado:', status);
       },
       onModeChange: (mode) => {
          console.log('Modo alterado:', mode);
          // Control visualization directly based on SDK mode
          try {
            if (config.mode === 'fullscreen' || config.mode === 'painel') {
              if (mode.mode == 'speaking') {
                updateVisualizerMode('active');
                console.log('[viz] speaking!!!');
              } else {
                // Any other mode (listening, idle, etc.) goes to idle
                updateVisualizerMode('idle');
                console.log('[viz] idle!');
              }
            }
          } catch {}
       },
     });

      // Try to hook SDK audio for visualization
      if (config.mode === 'fullscreen' || config.mode === 'painel') {
        await hookConversationAudio(conversationInstance);
        setActiveConversation(conversationInstance);
      }

   } catch (error) {
     console.error('Erro ao iniciar a conversa:', error);
     updateStatus('Erro ao iniciar');
   }
 }

 // Função para encerrar a conversa
 async function endConversation() {
   if (audio) {
      audio.pause();
      audio = null;
   }
   // Clear subtitles
   clearSubtitles();
   
   // Return to idle
   updateVisualizerMode('idle');
   if (conversationInstance) {
     await conversationInstance.endSession();
     conversationInstance = null;
   }
   updateStatus('Desconectado');
   startBtn.classList.remove('hidden');
   stopBtn.classList.add('hidden');
 }

 // Eventos dos botões
 startBtn.addEventListener('click', startConversation);
 stopBtn.addEventListener('click', endConversation);
