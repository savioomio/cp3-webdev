# prompts.md — CP3: CRUD e IA Generativa

## IAs consultadas

1. Claude (Anthropic — Opus 4.7)
2. Gemini (Google — Gemini 3.1 Pro)
3. ChatGPT (OpenAI — GPT-5.5)

---

## Prompt utilizado

> Você é um desenvolvedor web experiente. Preciso que você crie uma aplicação web completa com tema de **lista de mercados de previsão estilo Polymarket**.
>
> **Restrições técnicas obrigatórias:**
> - Apenas HTML, CSS e JavaScript puro — sem frameworks, sem bibliotecas externas
> - Os dados devem ser armazenados em um **array de strings** (não array de objetos)
> - Toda a lógica deve estar em **funções nomeadas** — sem código solto fora de funções, exceto declaração de variáveis e a chamada inicial de renderização
>
> **A aplicação deve ter duas telas:**
>
> **1. Tela de login (visível ao abrir a página)**
> - Campos de usuário e senha
> - Credenciais corretas: usuário `aluno`, senha `fiap2025`
> - Se correto: esconde o login e exibe a lista
> - Se incorreto: exibe mensagem de erro **na tela** (não no console)
> - Campos vazios devem ser validados com mensagem de erro na tela
>
> **2. Tela da lista (oculta inicialmente)**
> - Array com pelo menos 3 perguntas de previsão como itens iniciais (ex: "Bitcoin vai superar $150k em 2026?")
> - Botão para **adicionar item ao final** da lista
> - Botão para **adicionar item ao início** da lista
> - Cada item deve ter botão de **editar** e botão de **remover**
> - A remoção deve usar o **índice** do item (não o valor), para evitar remover duplicatas
> - Ao editar: se cancelar ou confirmar com campo vazio, o item original deve permanecer inalterado
> - Nenhum item vazio pode ser salvo — exibir mensagem de erro na tela
> - A lista deve re-renderizar automaticamente após qualquer alteração
>
> **Entregue os três arquivos separados:** `index.html`, `style.css` e `script.js`, com um visual moderno e escuro inspirado no Polymarket.

Nenhum refinamento foi necessário — o prompt já estava detalhado o suficiente para as três IAs gerarem respostas completas.

---

## Análise das respostas

### Claude (Opus 4.7)

**Problemas encontrados:**
- Usou objetos dentro do array (`{ id, text }`) em vez de array de strings puras, descumprindo um requisito central
- A remoção de itens usava `.filter()` pelo valor, não pelo índice — causaria bug com itens duplicados
- O visual estava funcional mas genérico, sem identidade com o tema Polymarket

---

### Gemini (Gemini 3.1 Pro)

**Problemas encontrados:**
- Respeitou o array de strings, mas colocou lógica de renderização solta fora de funções nomeadas
- Misturou HTML e JavaScript no mesmo arquivo (tudo inline no `index.html`), dificultando organização
- Não implementou a funcionalidade de adicionar ao início da lista (unshift)

---

### ChatGPT (GPT-5.5)

**Problemas encontrados:**
- Seguiu corretamente o array de strings e as funções nomeadas
- Implementou todos os requisitos do CRUD, incluindo adicionar ao início e ao final
- O estilo CSS estava mais completo e com visual escuro próximo ao solicitado
- Pequeno problema: a validação do login não exibia mensagem de erro na tela — só bloqueava o envio silenciosamente

---

## IA escolhida como base

**ChatGPT (GPT-5.5)** foi escolhido como base por ter sido a resposta mais completa tecnicamente:
- Único que respeitou array de strings **e** funções nomeadas ao mesmo tempo
- Implementou todas as operações do CRUD, incluindo o `unshift` para adicionar ao início
- O visual já tinha uma identidade escura mais próxima do Polymarket

O ajuste principal feito foi adicionar a mensagem de erro visível na tela para credenciais inválidas no login, que estava faltando, e refinar o CSS para deixar o visual mais fiel ao tema de mercados de previsão.
