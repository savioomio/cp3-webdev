var mercados = [
  "Bitcoin vai superar $150k em 2026?",
  "A selecao brasileira vai vencer a Copa do Mundo de 2026?",
  "A taxa Selic ficara abaixo de 8% ate o fim de 2026?",
  "Um filme de ficcao cientifica vencera o Oscar de melhor filme em 2027?"
];

var usuarioCorreto = "aluno";
var senhaCorreta = "fiap2025";

function obterElemento(id) {
  return document.getElementById(id);
}

function limparMensagem(elemento) {
  elemento.textContent = "";
}

function mostrarMensagem(elemento, texto) {
  elemento.textContent = texto;
}

function validarLogin(usuario, senha) {
  if (usuario === "" || senha === "") {
    return "Preencha usuario e senha para continuar.";
  }

  if (usuario !== usuarioCorreto || senha !== senhaCorreta) {
    return "Usuario ou senha incorretos.";
  }

  return "";
}

function entrarNaLista() {
  obterElemento("loginScreen").classList.add("hidden");
  obterElemento("marketScreen").classList.remove("hidden");
  obterElemento("marketInput").focus();
  renderizarLista();
}

function processarLogin(evento) {
  var usuario = obterElemento("userInput").value.trim();
  var senha = obterElemento("passwordInput").value.trim();
  var mensagem = obterElemento("loginMessage");
  var erro = validarLogin(usuario, senha);

  evento.preventDefault();

  if (erro !== "") {
    mostrarMensagem(mensagem, erro);
    return;
  }

  limparMensagem(mensagem);
  entrarNaLista();
}

function obterTextoNovoMercado() {
  return obterElemento("marketInput").value.trim();
}

function limparCampoMercado() {
  obterElemento("marketInput").value = "";
  obterElemento("marketInput").focus();
}

function validarTextoMercado(texto) {
  if (texto === "") {
    return "Nenhum item vazio pode ser salvo.";
  }

  return "";
}

function adicionarAoFinal() {
  var texto = obterTextoNovoMercado();
  var mensagem = obterElemento("marketMessage");
  var erro = validarTextoMercado(texto);

  if (erro !== "") {
    mostrarMensagem(mensagem, erro);
    return;
  }

  mercados.push(texto);
  limparMensagem(mensagem);
  limparCampoMercado();
  renderizarLista();
}

function adicionarAoInicio() {
  var texto = obterTextoNovoMercado();
  var mensagem = obterElemento("marketMessage");
  var erro = validarTextoMercado(texto);

  if (erro !== "") {
    mostrarMensagem(mensagem, erro);
    return;
  }

  mercados.unshift(texto);
  limparMensagem(mensagem);
  limparCampoMercado();
  renderizarLista();
}

function removerMercado(indice) {
  mercados.splice(indice, 1);
  limparMensagem(obterElemento("marketMessage"));
  renderizarLista();
}

function editarMercado(indice) {
  var textoAtual = mercados[indice];
  var novoTexto = prompt("Editar pergunta de previsao:", textoAtual);
  var mensagem = obterElemento("marketMessage");

  if (novoTexto === null) {
    limparMensagem(mensagem);
    return;
  }

  novoTexto = novoTexto.trim();

  if (novoTexto === "") {
    mostrarMensagem(mensagem, "O item original foi mantido. Nenhum item vazio pode ser salvo.");
    return;
  }

  mercados[indice] = novoTexto;
  limparMensagem(mensagem);
  renderizarLista();
}

function criarIndice(indice) {
  var span = document.createElement("span");
  span.className = "market-index";
  span.textContent = indice + 1;
  return span;
}

function criarPergunta(texto) {
  var paragrafo = document.createElement("p");
  paragrafo.className = "market-question";
  paragrafo.textContent = texto;
  return paragrafo;
}

function criarBotaoEditar(indice) {
  var botao = document.createElement("button");
  botao.type = "button";
  botao.className = "icon-button";
  botao.textContent = "Editar";
  botao.addEventListener("click", function executarEdicao() {
    editarMercado(indice);
  });
  return botao;
}

function criarBotaoRemover(indice) {
  var botao = document.createElement("button");
  botao.type = "button";
  botao.className = "icon-button remove";
  botao.textContent = "Remover";
  botao.addEventListener("click", function executarRemocao() {
    removerMercado(indice);
  });
  return botao;
}

function criarAcoes(indice) {
  var div = document.createElement("div");
  div.className = "market-actions";
  div.appendChild(criarBotaoEditar(indice));
  div.appendChild(criarBotaoRemover(indice));
  return div;
}

function criarItemMercado(texto, indice) {
  var item = document.createElement("li");
  item.className = "market-item";
  item.appendChild(criarIndice(indice));
  item.appendChild(criarPergunta(texto));
  item.appendChild(criarAcoes(indice));
  return item;
}

function atualizarContador() {
  var texto = mercados.length === 1 ? "1 mercado" : mercados.length + " mercados";
  obterElemento("marketCount").textContent = texto;
}

function renderizarLista() {
  var lista = obterElemento("marketList");
  var indice = 0;

  lista.innerHTML = "";

  while (indice < mercados.length) {
    lista.appendChild(criarItemMercado(mercados[indice], indice));
    indice++;
  }

  atualizarContador();
}

renderizarLista();
