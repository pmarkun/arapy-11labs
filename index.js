// Importa o Conversation do pacote @11labs/client
 import { Conversation } from '@11labs/client';
 import { initFullVisualizer, observeMediaPlayback, hookConversationAudio, connectMediaEl, setActiveConversation, updateVisualizerMode, configureVisualizer} from './visualizer.js';

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
    mode: urlParams.get('mode') || 'default',
}

//try to load  a {name}.json from the server overwriting the whole config object
const loadConfig = async () => {
  if (!config.agentId) {
      try {
          const response = await fetch(`./agents/${config.name}.json`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          config = data;
          console.log('Config loaded:', config);

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

  // Setup full mode background if needed
  config.mode = urlParams.get('mode') || config.mode || 'default';
  setupFullModeBackground();

};

loadConfig();

// Função para configurar o background image no modo full
const setupFullModeBackground = () => {
  if (config.mode === 'full' && config.backgroundImage) {
    const fullModeEl = document.getElementById('fullMode');
    if (fullModeEl) {
      // Aplica a imagem de fundo com opacity 0.5 e blend com preto
      fullModeEl.style.setProperty('--bg-image', `url('${config.backgroundImage}')`);
      fullModeEl.classList.add('has-bg');
      console.log('Background image configured:', config.backgroundImage);
    }
  }
};


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
       if (config.mode === 'full') {
         await connectMediaEl(audio);
         updateVisualizerMode('line');
       }
        audio.play();
        updateStatus('Reproduzindo áudio de boas-vindas');
        await new Promise((resolve) => {
          audio.onended = () => {
            if (config.mode === 'full') updateVisualizerMode('idle');
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
         // Aqui você pode, por exemplo, atualizar a interface com transcrições ou processar o áudio recebido.
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
            if (config.mode === 'full') {
              if (mode.mode == 'speaking') {
                updateVisualizerMode('line');
                console.log('[viz] speaking!!!');
              } else {
                // Any other mode (listening, idle, etc.) goes to circle
                updateVisualizerMode('idle');
                console.log('[viz] idle!');
              }
            }
          } catch {}
       },
     });

      // Try to hook SDK audio for visualization
      if (config.mode === 'full') {
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

 // Full mode UI wiring: toggle layout and click-to-start anywhere
 const cardEl = document.getElementById('card');
 const fullModeEl = document.getElementById('fullMode');
 if (config.mode === 'full') {
   // Hide card, show overlay
   if (cardEl) cardEl.classList.add('hidden');
   if (fullModeEl) fullModeEl.classList.remove('hidden');
   
   // Initialize visualizer with config
   const vizConfig = config.visualizer || { mode: 'line', color: '#00ff80' };
   initFullVisualizer('vizCanvas', vizConfig);
   observeMediaPlayback();
   
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