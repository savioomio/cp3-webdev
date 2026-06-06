# CP3 — WebDev: Batalha das IAs

Mesmo prompt entregue para três assistentes de IA. Cada um deveria criar uma aplicação web de mercados de previsão estilo Polymarket — com login, CRUD e visual escuro — e salvar os arquivos na sua própria pasta.

## Resultado

**Vencedor: Antigravity (Gemini 3.1 Pro)**

O Antigravity foi o único que entregou uma experiência completa: interação por teclado (Enter para logar e cadastrar), JavaScript moderno com `const`/`let`, botão de sair funcionando e troca de tela sem bug.

## As três entregas

| IA | Pasta | Status |
|---|---|---|
| Antigravity — Gemini 3.1 Pro | `antigravity/` | ✅ Funciona |
| Claude — Opus 4.8 | `claude/` | ✅ Funciona |
| Codex — GPT-5.5 | raiz do repo | ❌ Bug de tela + sem logout |

## Por que o Antigravity ganhou

- **Enter para submeter** — o único que pensou em quem usa o teclado
- **`const`/`let`** — JavaScript atual, não `var` de 2009
- **Telas isoladas** — login some de verdade ao entrar
- **Botão Sair** — dá pra voltar pro login sem recarregar a página

## Por que o Codex perdeu

- Salvou os arquivos na raiz do repositório, não na pasta `codex/`
- Depois do login, a tela de login continua visível e o CRUD aparece embaixo
- Não tem botão de Sair — uma vez dentro, sem saída

## Análise técnica completa

Disponível em [`.docs/analise-comparativa.md`](.docs/analise-comparativa.md) — cada afirmação tem arquivo e número de linha como prova.
