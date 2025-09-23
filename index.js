 // Importa o Conversation do pacote @11labs/client
 import { Conversation } from '@11labs/client';

 const startBtn = document.getElementById('startBtn');
 const stopBtn = document.getElementById('stopBtn');
 const statusEl = document.getElementById('status');
 let conversationInstance = null;
 let audio = null;

// on page load: check for name and id parameters in url, then set the <span id=name> object


const urlParams = new URLSearchParams(window.location.search);
let config = {
    name: urlParams.get('name'),
    agentId: urlParams.get('id'),
}

//try to load  a {name}.json from the server overwriting the whole config object
const loadConfig = async () => {
  if (!config.agentId) {
      try {
          const response = await fetch(`agents/${config.name}.json`);
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
        audio.play();
        updateStatus('Reproduzindo áudio de boas-vindas');
        await new Promise((resolve) => {
          audio.onended = resolve;
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
       },
     });

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