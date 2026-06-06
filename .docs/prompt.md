Você é um desenvolvedor web experiente. Preciso que você crie uma aplicação web completa com tema de **lista de mercados de previsão estilo Polymarket**.

## Restrições técnicas obrigatórias

- Apenas HTML, CSS e JavaScript puro — sem frameworks, sem bibliotecas externas
- Os dados devem ser armazenados em um **array de strings** (não array de objetos)
- Toda a lógica deve estar em **funções nomeadas** — sem código solto fora de funções, exceto declaração de variáveis e a chamada inicial de renderização

## A aplicação deve ter duas telas

### 1. Tela de login (visível ao abrir a página)

- Campos de usuário e senha
- Credenciais corretas: usuário `aluno`, senha `fiap2025`
- Se correto: esconde o login e exibe a lista
- Se incorreto: exibe mensagem de erro **na tela** (não no console)
- Campos vazios devem ser validados com mensagem de erro na tela

### 2. Tela da lista (oculta inicialmente)

- Array com pelo menos 3 perguntas de previsão como itens iniciais (ex: "Bitcoin vai superar $150k em 2026?")
- Botão para **adicionar item ao final** da lista
- Botão para **adicionar item ao início** da lista
- Cada item deve ter botão de **editar** e botão de **remover**
- A remoção deve usar o **índice** do item (não o valor), para evitar remover duplicatas
- Ao editar: se cancelar ou confirmar com campo vazio, o item original deve permanecer inalterado
- Nenhum item vazio pode ser salvo — exibir mensagem de erro na tela
- A lista deve re-renderizar automaticamente após qualquer alteração

## Entrega

Entregue os três arquivos separados: `index.html`, `style.css` e `script.js`, com um visual moderno e escuro inspirado no Polymarket.
