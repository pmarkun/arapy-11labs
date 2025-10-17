# Legendas - Guia de Uso

## Melhorias Implementadas

### 0. ✅ Configuração Padrão (Novo!)

As legendas agora possuem **configuração padrão completa**. Não é mais necessário especificar a seção `subtitles` no JSON!

**Valores padrão:**
```json
{
  "enabled": true,
  "wordsPerSecond": 3,
  "fadeOutDelay": 2000,
  "maxLines": 2,
  "maxCharsPerLine": 40,
  "blockDuration": 3000,
  "position": "bottom",
  "fontSize": "2rem",
  "color": "#ffffff",
  "backgroundColor": "rgba(0, 0, 0, 0.7)"
}
```

**Opções de uso:**

```json
// 1. Sem configuração - usa todos os padrões (legendas ativadas)
{
  "name": "Hans",
  "agentId": "agent_xxx"
  // Sem seção "subtitles" - OK!
}

// 2. Configuração parcial - sobrescreve apenas o que você quer
{
  "name": "Hans",
  "agentId": "agent_xxx",
  "subtitles": {
    "fontSize": "3rem",  // Apenas muda o tamanho
    "color": "#ff0000"   // Apenas muda a cor
    // Resto usa padrões
  }
}

// 3. Desabilitar legendas
{
  "name": "Hans",
  "agentId": "agent_xxx",
  "subtitles": {
    "enabled": false
  }
}

// 4. Configuração completa
{
  "name": "Hans",
  "agentId": "agent_xxx",
  "subtitles": {
    "enabled": true,
    "fontSize": "2.5rem",
    "color": "#ff6b35",
    // ... todos os campos
  }
}
```

### 1. ✅ Toggle de Legendas via URL

Você pode controlar as legendas diretamente pela URL, sobrescrevendo a configuração do JSON.

**Exemplos:**

```bash
# Forçar legendas ATIVADAS (mesmo se disabled no JSON)
?name=Vlado&mode=fullscreen&subtitles=true
?name=Hans&mode=painel&subtitles=1

# Forçar legendas DESATIVADAS (mesmo se enabled no JSON)
?name=Vlado&mode=fullscreen&subtitles=false
?name=Hans&mode=painel&subtitles=0

# Usar configuração do JSON (não passa parâmetro)
?name=Vlado&mode=fullscreen
```

### 2. ✅ Exibição em Blocos com Animação Dinâmica

As legendas são exibidas em **blocos de texto** que se ajustam automaticamente, mas com **animação palavra-por-palavra** dentro de cada bloco.

**Como funciona:**

```
Texto: "Olá, como vai? Eu sou uma inteligência artificial criada para conversar."

Bloco 1: "Olá, como vai? Eu sou uma inteligência"
→ Animação: "Olá" → "Olá, como" → "Olá, como vai?" → ... (palavra por palavra)
[aguarda tempo restante do bloco]

Bloco 2: "artificial criada para conversar."
→ Animação: "artificial" → "artificial criada" → ... (palavra por palavra)
[aguarda tempo restante]
[fade out]
```

**Timing:**
- Cada palavra aparece a ~3 palavras/segundo (configurável)
- Após todas as palavras do bloco aparecerem, aguarda tempo restante
- `blockDuration` define o tempo mínimo total do bloco
- Se a animação levar mais tempo, o bloco dura mais

**Exemplo de cálculo:**
```javascript
// Bloco com 10 palavras, wordsPerSecond=3, blockDuration=3000ms

Tempo de animação = 10 palavras ÷ 3 palavras/seg = 3.33 segundos
Tempo mínimo = 3.0 segundos
Tempo total = max(3.33, 3.0) = 3.33 segundos

// Durante 3.33s: animação palavra por palavra
// Após animação: próximo bloco imediatamente
```

### 3. ✅ Filtro de Mensagens do Usuário

As legendas agora **ignoram automaticamente** as mensagens do usuário, exibindo apenas a fala da IA.

**Comportamento:**

```javascript
// Mensagem do USUÁRIO - IGNORADA ❌
{
  type: 'message',
  source: 'user',
  text: 'Qual é o seu nome?'
}
// Legenda: (nada é exibido)

// Mensagem da IA - EXIBIDA ✅
{
  type: 'message',
  source: 'ai',
  text: 'Meu nome é Hans Staden.'
}
// Legenda: "Meu nome é Hans Staden." (animada palavra por palavra)
```

**Detecção de Origem:**

O sistema verifica múltiplos campos para identificar a origem:
- `message.source` (ai, agent, user)
- `message.role` (assistant, user)
- `message.from` (user, ai)

Se nenhum campo estiver presente, assume que é da IA e exibe.

## Exemplos de URLs Completas

### Vlado - Painel com Legendas
```
http://localhost:1234/?name=Vlado&mode=painel&visualization=image&subtitles=true
```

### Hans - Fullscreen sem Legendas
```
http://localhost:1234/?name=Hans&mode=fullscreen&visualization=line&subtitles=false
```

### Hans - Fullscreen com Legendas (do JSON)
```
http://localhost:1234/?name=Hans&mode=fullscreen
```

## Configurações Recomendadas

### Para Painel LED (384x768)

```json
{
  "subtitles": {
    "enabled": true,
    "maxLines": 2,
    "maxCharsPerLine": 30,      // Menor para tela estreita
    "blockDuration": 3000,
    "position": "bottom",
    "fontSize": "1.5rem",        // Fonte menor para caber
    "color": "#ffffff",
    "backgroundColor": "rgba(0, 0, 0, 0.85)"
  }
}
```

### Para Fullscreen Desktop

```json
{
  "subtitles": {
    "enabled": true,
    "maxLines": 2,
    "maxCharsPerLine": 50,      // Mais caracteres para tela maior
    "blockDuration": 3500,
    "position": "bottom",
    "fontSize": "2.5rem",        // Fonte maior
    "color": "#ffffff",
    "backgroundColor": "rgba(0, 0, 0, 0.7)"
  }
}
```

### Para Apresentações

```json
{
  "subtitles": {
    "enabled": true,
    "maxLines": 2,
    "maxCharsPerLine": 40,
    "blockDuration": 4000,      // Mais tempo para leitura
    "position": "bottom",
    "fontSize": "3rem",          // Fonte grande
    "color": "#ffff00",          // Amarelo para contraste
    "backgroundColor": "rgba(0, 0, 0, 0.9)"
  }
}
```

## Debugging

O componente inclui logs detalhados no console:

```javascript
[subtitle] Message received: { type: 'message', ... }
[subtitle] Ignoring user message
[subtitle] Displaying: "Texto completo da mensagem"
[subtitle] Blocks: ["Bloco 1", "Bloco 2", "Bloco 3"]
[subtitle] Showing block: "Bloco 1"
```

## Fluxo de Processamento

```
1. Mensagem chega via onMessage
   ↓
2. Verifica se é da IA (filtra usuário)
   ↓
3. Extrai texto da mensagem
   ↓
4. Quebra texto em blocos (breakIntoBlocks)
   - Respeita maxLines e maxCharsPerLine
   - Quebra em espaços (não corta palavras)
   ↓
5. Exibe primeiro bloco
   - Animação palavra-por-palavra
   - Cada palavra aparece no ritmo de wordsPerSecond
   ↓
6. Aguarda tempo restante do blockDuration (se houver)
   ↓
7. Exibe próximo bloco (repete 5-7)
   ↓
8. Fade out após último bloco
```

## Algoritmo de Quebra de Blocos

```javascript
// Exemplo: maxCharsPerLine=40, maxLines=2 → maxCharsPerBlock=80

Texto: "Esta é uma mensagem muito longa que precisa ser dividida em blocos menores"

Palavras: ["Esta", "é", "uma", "mensagem", "muito", "longa", ...]

Bloco 1: "Esta é uma mensagem muito longa que precisa ser"  (52 chars)
Bloco 2: "dividida em blocos menores"                       (27 chars)

// Cada bloco é exibido por no mínimo 3 segundos
```

## Personalização Avançada

### Mudar Posição

```json
{
  "position": "top"    // Legendas no topo
  "position": "center" // Legendas centralizadas
  "position": "bottom" // Legendas embaixo (padrão)
}
```

### Mudar Cores por Agente

```json
// Vlado - tema escuro
{
  "color": "#ffffff",
  "backgroundColor": "rgba(0, 0, 0, 0.7)"
}

// Hans - tema laranja
{
  "color": "#ff6b35",
  "backgroundColor": "rgba(0, 0, 0, 0.8)"
}
```

### Ajustar Velocidade

```json
{
  "wordsPerSecond": 2,    // Mais lento (melhor para leitura)
  "wordsPerSecond": 3,    // Normal
  "wordsPerSecond": 4     // Mais rápido (fala acelerada)
}
```

## Limitações

- ❌ Não sincroniza com áudio em tempo real (usa duração estimada)
- ❌ Não suporta formatação (negrito, itálico)
- ❌ Quebra aproximada (baseada em contagem de caracteres)
- ✅ Funciona bem para textos de até ~200 palavras
- ✅ Ideal para conversações naturais

## Troubleshooting

### Legendas não aparecem

1. Verifique se `subtitles.enabled: true` no JSON
2. Verifique se está em modo `fullscreen` ou `painel`
3. Verifique console para logs `[subtitle]`
4. Tente forçar com `?subtitles=true` na URL

### Texto cortado

1. Aumente `maxCharsPerLine`
2. Aumente `maxLines`
3. Diminua `fontSize`

### Blocos muito rápidos

1. Aumente `blockDuration`
2. Diminua `wordsPerSecond`

### Blocos muito lentos

1. Diminua `blockDuration`
2. Aumente `wordsPerSecond`
