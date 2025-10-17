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
{
    "name": "Nome do Agente",
    "agentId": "agent_id",
    "defaultVisualization": "image",
    "backgroundImage": "images/background.jpg",
    "startAudio": "audio/intro.mp3",
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
