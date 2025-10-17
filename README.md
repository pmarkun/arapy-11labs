# Retrovisor.IA - Modos de Visualização

## Modos Disponíveis

### 1. Modo Card (Padrão)
Interface padrão com cartão centralizado.
```
?name=Vlado
```

### 2. Modo Fullscreen
Visualização em tela cheia, ocupando todo o viewport disponível.
```
?name=Vlado&mode=fullscreen
?name=Vlado&mode=fullscreen&visualization=line
```

### 3. Modo Painel (LED Panel)
Visualização otimizada para painel de LED com dimensões fixas de **384x768 pixels**.
```
?name=Vlado&mode=painel
?name=Vlado&mode=painel&visualization=image
```

## Parâmetros de URL

| Parâmetro | Valores | Descrição |
|-----------|---------|-----------|
| `name` | string | Nome do agente (obrigatório) |
| `id` | string | ID direto do agente (opcional, sobrescreve o JSON) |
| `mode` | `card`, `fullscreen`, `painel` | Modo de exibição (padrão: `card`) |
| `visualization` | string | Nome da visualização (ex: `image`, `line`, `line-green`) |

## Estrutura do JSON

```json
## Estrutura do JSON

```json
{
    "name": "Nome do Agente",
    "agentId": "agent_id",
    "defaultVisualization": "image",
    "backgroundImage": "images/background.jpg",
    "startAudio": "audio/intro.mp3",
    "subtitles": {
        "enabled": true,
        "wordsPerSecond": 3,
        "fadeOutDelay": 2000,
        "maxLines": 2,
        "position": "bottom",
        "fontSize": "2rem",
        "color": "#ffffff",
        "backgroundColor": "rgba(0, 0, 0, 0.7)"
    },
    "visualizations": {
        "image": {
            "mode": "image",
            "interval": 200,
            "backgroundColor": "#1a1a2e",
            "talk_images": ["agents/face01.png", "agents/face02.png"],
            "idle_images": ["agents/face01.png"]
        },
        "line": {
            "mode": "line",
            "color": "#ff6b35",
            "lineWidth": 3,
            "shadowBlur": 16
        }
    }
}
```

## Campos obrigatórios:

### Para todos os agentes:
- `visualizations`: Objeto contendo as configurações de visualização
- `defaultVisualization`: Nome da visualização padrão (usada quando o parâmetro URL não é fornecido)

### Para legendas (opcional):
- `subtitles.enabled`: Ativa/desativa as legendas (true/false)
- `subtitles.wordsPerSecond`: Velocidade de exibição das palavras (padrão: 3)
- `subtitles.fadeOutDelay`: Tempo em ms antes de desaparecer (padrão: 2000)
- `subtitles.maxLines`: Número máximo de linhas (padrão: 2)
- `subtitles.position`: Posição das legendas: 'bottom', 'top', 'center'
- `subtitles.fontSize`: Tamanho da fonte CSS (padrão: '2rem')
- `subtitles.color`: Cor do texto (padrão: '#ffffff')
- `subtitles.backgroundColor`: Cor de fundo com transparência (padrão: 'rgba(0, 0, 0, 0.7)')

### Para visualização do tipo "line":
- `mode`: deve ser "line"
- `color`: cor da linha (formato hexadecimal)

### Para visualização do tipo "image":
- `mode`: deve ser "image"
- `talk_images`: Array com caminhos das imagens para quando está falando
- `idle_images`: Array com caminhos das imagens para quando está inativo

## Funcionalidades

### 🎬 Legendas Dinâmicas

O sistema possui um componente de legendas que exibe o texto falado pela IA de forma sincronizada:

**Características:**
- ✅ Animação palavra por palavra
- ✅ Sincronização com a velocidade da fala
- ✅ Fade in/out suave
- ✅ Posicionamento configurável (bottom, top, center)
- ✅ Estilo totalmente customizável via JSON
- ✅ Suporte a múltiplas linhas
- ✅ Integração automática com 11Labs API

**Configuração:**
```json
"subtitles": {
    "enabled": true,
    "wordsPerSecond": 3,
    "fadeOutDelay": 2000,
    "maxLines": 2,
    "position": "bottom",
    "fontSize": "2rem",
    "color": "#ffffff",
    "backgroundColor": "rgba(0, 0, 0, 0.7)"
}
```

## Exemplos de Uso

### Vlado - Modo Painel com Visualização de Imagem
```
http://localhost:3000/?name=Vlado&mode=painel&visualization=image
```

### Vlado - Modo Painel com Visualização de Linha
```
http://localhost:3000/?name=Vlado&mode=painel&visualization=line
```

### Hans - Modo Fullscreen
```
http://localhost:3000/?name=Hans&mode=fullscreen
```

### Hans - Modo Painel com Linha Verde
```
http://localhost:3000/?name=Hans&mode=painel&visualization=line-green
```

### Vlado - Modo Card (interface padrão)
```
http://localhost:3000/?name=Vlado
```

## Diferenças entre Fullscreen e Painel

| Aspecto | Fullscreen | Painel |
|---------|-----------|--------|
| Dimensões | Ocupa todo o viewport | Fixo: 384x768px |
| Responsivo | Sim, adapta ao tamanho da tela | Não, sempre 384x768px |
| Posicionamento | `fixed inset-0` | `fixed` centralizado |
| Uso | Navegadores, projetores | Painéis de LED específicos |

## Agentes Disponíveis

### Vlado
- **defaultVisualization**: `image`
- **Visualizações**: 
  - `image` - Animação com faces
  - `line` - Linha de áudio verde

### Hans Staden
- **defaultVisualization**: `line`
- **Visualizações**: 
  - `line` - Linha de áudio laranja
  - `line-green` - Linha de áudio verde
- **backgroundImage**: `images/hans-staden.jpg`

## Tratamento de Erros

O sistema valida automaticamente:
- Existência do objeto `visualizations`
- Modo de visualização solicitado
- Parâmetros obrigatórios por tipo de visualização

Erros são exibidos em uma tela vermelha com informações detalhadas e dicas.
