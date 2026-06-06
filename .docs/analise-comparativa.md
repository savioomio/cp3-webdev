# Análise Comparativa — CP3 WebDev
### Antigravity (Gemini 3.1 Pro) × Claude (Opus 4.8) × Codex (GPT-5.5)

> **Regra deste documento:** cada afirmação tem arquivo + linha como prova. Sem prova = marcado como opinião. Claude analisa a si mesmo com o mesmo critério dos outros — sem filtro.

---

## 1. Resumo executivo

| Critério | Antigravity | Claude | Codex |
|---|---|---|---|
| Gravou na pasta certa | ✅ | ✅ | ❌ raiz do repo |
| JS moderno (`const`/`let`) | ✅ | ❌ | ❌ |
| Enter para submeter | ✅ | ❌ | ❌ |
| Botão Sair | ✅ | ✅ | ❌ |
| Troca de tela sem bug visual | ✅ | ✅ | ❌ |
| `focus()` automático | ❌ | ❌ | ✅ |
| Contador de itens | ❌ | ❌ | ✅ |
| Funções de criação granulares | ❌ | ✅ | ✅ |
| Validação de login sem DOM (função pura) | ❌ | ❌ | ✅ |
| Credenciais expostas globalmente | ❌ (falha) | ❌ (falha) | ❌ (falha) |

**Vencedor de UX:** Antigravity
**Vencedor de organização:** Claude e Codex empatados por razões diferentes
**Pior entrega geral:** Codex — bugs funcionais + falha de processo

---

## 2. Antigravity (`antigravity/script.js`)

### Pontos fortes

**JS moderno** — único dos três a usar `const`/`let` corretamente.
- `const` para referências que não mudam: linhas 38, 40, 62, 64, 81, 91, 96, 104, etc.
- `let` só onde há reatribuição: linhas 89, 148.
- `var` vaza pro escopo da função inteira e sofre *hoisting* silencioso. `const` impede reatribuição acidental. Isso não é estética, é segurança.

**Interação de teclado** — único dos três que pensou em quem usa o teclado:
- Linha 183-193: `Enter` na senha executa o login.
- Linha 195-205: `Enter` no campo adiciona mercado ao final.
- Isso é o mínimo de acessibilidade esperado em qualquer formulário moderno.

**Funções utilitárias de UI** — `showElement`, `hideElement`, `showError`, `clearError` (linhas 9-33). Evita repetir `document.getElementById(...).classList...` espalhado pelo código. Qualquer ajuste de visibilidade muda num único lugar.

**Logout completo** — `handleLogout()` (linha 59) limpa campos, troca telas, remove estado. Correto.

### Pontos fracos

**`data-index` + `parseInt` para capturar índice** (linhas 70-78):
```js
const index = parseInt(event.target.getAttribute('data-index'), 10);
```
O índice vira string quando entra no atributo HTML e precisa ser convertido de volta. Se esquecer o `parseInt`, o índice quebra silenciosamente. Claude e Codex resolveram isso melhor com closure.

**`handleAddStart` e `handleAddEnd` duplicam o corpo inteiro** (linhas 124-152). As duas funções são idênticas exceto por `unshift` vs `push`. Poderia ser uma função com parâmetro, ou extrair a leitura/validação do input — como Claude e Codex fizeram.

**Sem `focus()` após ação** — depois de adicionar um item, o cursor não volta pro campo.

---

## 3. Claude (`claude/script.js`)

### Pontos fortes

**Granularidade de funções** — cada elemento do DOM tem função própria de criação:
`criarBotaoEditar` (linha 178), `criarBotaoRemover` (linha 189), `criarItem` (linha 155), `criarEstadoVazio` (linha 200). Cada função tem uma responsabilidade. Fácil de ler e modificar isoladamente.

**Closure para capturar índice** (linhas 183-185):
```js
btn.addEventListener("click", function () {
    editarItem(indice);
});
```
O índice é capturado no momento da criação, sem passar pelo DOM. Mais seguro que `data-index`.

**Tratamento de lista vazia** (linhas 145-148) — exibe estado dedicado na UI, não deixa em branco.

**Separação entre "cancelou" e "confirmou vazio"** (linha 123-126):
```js
if (novo === null || novo.trim() === "") {
    mostrarErroLista(novo !== null ? "Edição ignorada..." : "");
    return;
}
```
Comportamentos diferentes, tratados diferente. Os outros dois colapsam os dois casos.

### Pontos fracos (sem filtro)

**`var` em tudo** — 19 declarações. Datado. No loop `for` da linha 150, o `var i` vaza para fora do bloco — não causa bug aqui porque o loop é simples, mas é hábito ruim que esconde bugs em código mais complexo.

**Sem Enter para submeter** — zero listeners de teclado. Para qualquer ação, obrigatório usar o mouse.

**Sem `focus()` após login ou após adicionar**.

**`inicializar()` que só chama `registrarEventos()`** (linhas 21-23) — uma função que só delega para outra sem adicionar lógica é indireção sem propósito. Poderia chamar `registrarEventos()` diretamente ou ter o conteúdo inline.

**Credenciais como variáveis globais** (linhas 9-10) — `var USUARIO_VALIDO = "aluno"` fica acessível pelo console do navegador. Antigravity e Codex fazem o mesmo. O certo seria ter as credenciais hardcoded dentro da função de validação, invisíveis globalmente. **Nenhum dos três acertou aqui.**

---

## 4. Codex (`script.js` na raiz do repositório)

### Pontos fortes

**Validação de login em função pura** (linhas 23-33):
```js
function validarLogin(usuario, senha) {
    if (usuario === "" || senha === "") {
        return "Preencha usuario e senha para continuar.";
    }
    if (usuario !== usuarioCorreto || senha !== senhaCorreta) {
        return "Usuario ou senha incorretos.";
    }
    return "";
}
```
Recebe parâmetros, retorna string, não acessa o DOM, não tem efeito colateral. **Testável isoladamente.** Claude e Antigravity misturam leitura de DOM com validação na mesma função — nenhum dos dois fez isso.

**Granularidade de funções** — igual ao Claude: `criarIndice`, `criarPergunta`, `criarAcoes`, `criarItemMercado` (linhas 136-187). Cada função faz uma coisa.

**`focus()` após entrar e após adicionar** (linhas 38, 64-65) — detalhe de UX correto que os outros dois esqueceram.

**Contador de itens com plural correto** (linhas 189-192) — "1 mercado" vs "N mercados". Feedback visual extra.

**Closure para índice** (linhas 155-158, 166-169) — igual ao Claude, mais robusto que Antigravity.

### Pontos fracos — falhas graves

**Pasta errada** — instrução era salvar em `codex/`. Os arquivos estão na raiz. A pasta `codex/` tem só o `prompt.md`. Incontestável.

**Sem botão Sair** — busca por "Sair", "sair", "logout", "handleLogout" no `index.html` da raiz: zero resultados. Sem função de logout no `script.js`. Uma vez logado, sem volta.

**Bug de troca de tela** — após login, a tela de login continua visível e o CRUD aparece abaixo. Causa: o `.app-shell` não isola as telas (só `width`/`margin`/`padding`, sem `position` ou `flex` para alternância — `style.css:71-75`). A classe `.hidden { display: none }` existe e é aplicada pelo JS (linhas 36-37), mas o layout empilhado não foi projetado para troca de tela, então o CRUD aparece abaixo do formulário antes do repaint.

**`var` em tudo** — 25 declarações. Pior dos três.

**`while` com índice manual** (linhas 196-203) no lugar de `for` — funciona, mas é mais verboso sem ganho. Escolha de estilo, não bug.

**`renderizarLista()` solto na linha 208** — o prompt dizia "sem código solto fora de funções". Os outros dois encapsularam em `initialize()`/`inicializar()`. Tecnicamente o prompt permite essa exceção para a chamada inicial, mas é inconsistente com o padrão do próprio código.

---

## 5. O que nenhum dos três fez

- **Credenciais expostas globalmente** — os três têm `usuarioCorreto`/`senhaCorreta` (ou equivalente) acessíveis pelo console. Nenhum encapsulou dentro da função de validação.
- **Enter para submeter** — só Antigravity implementou.
- **`focus()` após login** — só Codex implementou, mas tem bug de tela.
- **Estado de lista vazia** — só Claude e Antigravity trataram. O Codex não exibe nada quando a lista está vazia.

---

## 6. Comparação direta por tema

### Captura de índice
| | Método | Risco |
|---|---|---|
| Antigravity | `data-index` + `parseInt` | Índice vira string no DOM, precisa converter |
| Claude | Closure | Seguro, índice capturado na criação |
| Codex | Closure | Seguro, igual ao Claude |

### Validação
| | Login | Campo vazio |
|---|---|---|
| Antigravity | Mistura DOM + lógica | Mistura DOM + lógica |
| Claude | Mistura DOM + lógica | Função separada `lerNovoTexto()` |
| Codex | **Função pura sem DOM** | Função separada `validarTextoMercado()` |

**Codex tem a melhor arquitetura de validação** — apesar das falhas funcionais.

### Deduplicação
| | Adicionar início vs fim |
|---|---|
| Antigravity | Corpo inteiro duplicado |
| Claude | Extrai `lerNovoTexto()` mas ainda dois caminhos quase iguais |
| Codex | Extrai `obterTextoNovoMercado()` e `validarTextoMercado()` separados |

---

## 7. Argumento para o vídeo

Nenhuma IA ganhou em tudo. Cada uma acertou numa dimensão diferente:

- **Antigravity ganhou em UX e JS moderno** — é o mais prazeroso de usar, o mais correto tecnicamente na linguagem.
- **Claude ganhou em legibilidade** — é o mais fácil de ler e manter, mas conservador.
- **Codex teve a melhor arquitetura de validação** — mas entregou com três falhas que tornam o app inutilizável: sem logout, bug de tela, pasta errada.

A conclusão não é "qual IA é melhor". É: **o mesmo prompt gerou três arquiteturas diferentes, com forças em lugares diferentes, e nenhuma seria aprovada num code review sem ajustes**. Quem faz esse code review ainda é gente.

---

## 8. Roteiro para o vídeo (~5 min)

**[0:00 – 0:30] Gancho**
"Dei o mesmo desafio para três IAs. Todas disseram que entregaram. Uma não tinha botão de sair — você ficava preso. Outra nem salvou os arquivos no lugar certo. Deixa eu mostrar."

**[0:30 – 1:00] O desafio**
Mostra o prompt. Regra principal: cada IA salva na sua pasta. App estilo Polymarket, login + CRUD.

**[1:00 – 2:15] Testando ao vivo**
- Antigravity: Enter funcionando no login e no input. "Sem tirar a mão do teclado."
- Claude: funciona, sem o Enter.
- Codex: faz o login → CRUD aparece embaixo do formulário. "A tela de login não sumiu." Procura o botão Sair. "Não tem." Abre o explorador: "E os arquivos estão na raiz — não na pasta dele."

**[2:15 – 3:30] Abrindo o código**
- `const`/`let` no Antigravity vs `var` nos outros: "JS de 2009 vs JS atual."
- 4 listeners de teclado no Antigravity: "Foi o único que pensou no teclado."
- Função `validarLogin(usuario, senha)` no Codex: "Olha isso — sem acesso ao DOM, só recebe parâmetros e retorna. É a forma certa de escrever validação. Uma pena que veio com bug de tela e sem logout."
- Busca "Sair" no HTML do Codex: zero resultados.

**[3:30 – 4:30] O argumento**
"Três IAs, três pontos fortes em lugares diferentes. O Antigravity ganhou em experiência. O Claude ganhou em organização. O Codex teve a melhor ideia de validação — e entregou inutilizável. Nenhuma seria aprovada num code review."

**[4:30 – 5:00] Fechamento**
"A IA escreve. Quem valida ainda sou eu. E no dia que isso mudar, a gente conversa."

---

## 9. Frases de efeito

- "Todas disseram que entregaram. Nenhuma entregou perfeito."
- "O Codex escreveu a melhor validação — e esqueceu o botão de sair."
- "Os arquivos foram parar na raiz. Em um time real, o PR voltava na hora."
- "A IA gera três respostas. Quem decide qual presta ainda é gente."

---

## 10. Tabela de dados brutos (verificados nos arquivos)

| Métrica | Antigravity | Claude | Codex |
|---|---|---|---|
| Linhas de JS | 209 | 208 | 208 |
| `var` | 1 | 19 | 25 |
| `let` | 2 | 0 | 0 |
| `const` | 24 | 0 | 0 |
| Listeners Enter | 4 | 0 | 0 |
| Captura de índice | `data-index` | closure | closure |
| Validação de login sem DOM | ❌ | ❌ | ✅ |
| `focus()` automático | ❌ | ❌ | ✅ |
| Contador de itens | ❌ | ❌ | ✅ |
| Estado de lista vazia | ✅ | ✅ | ❌ |
| Botão Sair | ✅ | ✅ | ❌ |
| Troca de tela funcional | ✅ | ✅ | ❌ |
| Pasta correta | ✅ | ✅ | ❌ |
| Credenciais expostas globalmente | ❌ (falha) | ❌ (falha) | ❌ (falha) |

---

*Fonte de verdade: `antigravity/script.js`, `claude/script.js`, `script.js` (raiz = Codex). Lidos diretamente. Números contados por ferramenta.*
