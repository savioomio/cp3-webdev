// ============================================================
// PrevisãoMarket — lógica da aplicação
// Regras: dados em array de STRINGS, toda lógica em funções
// nomeadas. Fora de funções: apenas declarações e a chamada
// inicial de inicialização.
// ============================================================

// Credenciais válidas
var USUARIO_VALIDO = "aluno";
var SENHA_VALIDA = "fiap2025";

// Fonte de dados: array de strings (cada string é uma pergunta de mercado)
var mercados = [
  "Bitcoin vai superar $150k em 2026?",
  "O Brasil será campeão da Copa de 2026?",
  "A inflação anual ficará abaixo de 4% em 2026?"
];

// ---------- Inicialização ----------

function inicializar() {
  registrarEventos();
}

function registrarEventos() {
  document.getElementById("form-login").addEventListener("submit", aoEnviarLogin);
  document.getElementById("btn-sair").addEventListener("click", sair);
  document.getElementById("btn-add-fim").addEventListener("click", adicionarNoFinal);
  document.getElementById("btn-add-inicio").addEventListener("click", adicionarNoInicio);
}

// ---------- Login ----------

function aoEnviarLogin(evento) {
  evento.preventDefault();
  validarLogin();
}

function validarLogin() {
  var usuario = document.getElementById("input-usuario").value.trim();
  var senha = document.getElementById("input-senha").value.trim();

  if (usuario === "" || senha === "") {
    mostrarErroLogin("Preencha usuário e senha.");
    return;
  }

  if (usuario !== USUARIO_VALIDO || senha !== SENHA_VALIDA) {
    mostrarErroLogin("Usuário ou senha incorretos.");
    return;
  }

  mostrarErroLogin("");
  entrar();
}

function mostrarErroLogin(mensagem) {
  document.getElementById("erro-login").textContent = mensagem;
}

function entrar() {
  document.getElementById("tela-login").classList.add("oculto");
  document.getElementById("tela-lista").classList.remove("oculto");
  renderizarLista();
}

function sair() {
  document.getElementById("input-usuario").value = "";
  document.getElementById("input-senha").value = "";
  mostrarErroLogin("");
  document.getElementById("tela-lista").classList.add("oculto");
  document.getElementById("tela-login").classList.remove("oculto");
}

// ---------- Adicionar ----------

function adicionarNoFinal() {
  var texto = lerNovoTexto();
  if (texto === null) {
    return;
  }
  mercados.push(texto);
  limparCampoNovo();
  renderizarLista();
}

function adicionarNoInicio() {
  var texto = lerNovoTexto();
  if (texto === null) {
    return;
  }
  mercados.unshift(texto);
  limparCampoNovo();
  renderizarLista();
}

// Lê e valida o campo de novo item. Retorna a string válida ou null.
function lerNovoTexto() {
  var texto = document.getElementById("input-novo").value.trim();
  if (texto === "") {
    mostrarErroLista("Digite uma pergunta antes de adicionar.");
    return null;
  }
  mostrarErroLista("");
  return texto;
}

function limparCampoNovo() {
  document.getElementById("input-novo").value = "";
}

function mostrarErroLista(mensagem) {
  document.getElementById("erro-lista").textContent = mensagem;
}

// ---------- Editar e remover (por ÍNDICE) ----------

function editarItem(indice) {
  var atual = mercados[indice];
  var novo = prompt("Edite a pergunta do mercado:", atual);

  // Cancelou (null) ou confirmou vazio -> mantém o original inalterado
  if (novo === null || novo.trim() === "") {
    mostrarErroLista(novo !== null ? "Edição ignorada: o texto não pode ficar vazio." : "");
    return;
  }

  mercados[indice] = novo.trim();
  mostrarErroLista("");
  renderizarLista();
}

function removerItem(indice) {
  mercados.splice(indice, 1);
  mostrarErroLista("");
  renderizarLista();
}

// ---------- Renderização ----------

function renderizarLista() {
  var container = document.getElementById("lista-mercados");
  container.innerHTML = "";

  if (mercados.length === 0) {
    container.appendChild(criarEstadoVazio());
    return;
  }

  for (var i = 0; i < mercados.length; i++) {
    container.appendChild(criarItem(mercados[i], i));
  }
}

function criarItem(texto, indice) {
  var li = document.createElement("li");
  li.className = "item-mercado";

  var badge = document.createElement("span");
  badge.className = "item-indice";
  badge.textContent = indice + 1;

  var span = document.createElement("span");
  span.className = "item-texto";
  span.textContent = texto;

  var acoes = document.createElement("div");
  acoes.className = "item-acoes";
  acoes.appendChild(criarBotaoEditar(indice));
  acoes.appendChild(criarBotaoRemover(indice));

  li.appendChild(badge);
  li.appendChild(span);
  li.appendChild(acoes);
  return li;
}

function criarBotaoEditar(indice) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-icone btn-editar";
  btn.textContent = "Editar";
  btn.addEventListener("click", function () {
    editarItem(indice);
  });
  return btn;
}

function criarBotaoRemover(indice) {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn-icone btn-remover";
  btn.textContent = "Remover";
  btn.addEventListener("click", function () {
    removerItem(indice);
  });
  return btn;
}

function criarEstadoVazio() {
  var div = document.createElement("div");
  div.className = "lista-vazia";
  div.textContent = "Nenhum mercado na lista. Adicione uma nova pergunta acima.";
  return div;
}

// ---------- Chamada inicial ----------
inicializar();
