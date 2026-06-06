// Estado da aplicação
let markets = [
    "Bitcoin vai superar $150k em 2026?",
    "A IA da OpenAI vai alcançar AGI em 2025?",
    "O Fed vai cortar as taxas de juros abaixo de 3% este ano?"
];

// Funções Utilitárias de UI
function showElement(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function showError(id, message) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = message;
        showElement(id);
    }
}

function clearError(id) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = "";
        hideElement(id);
    }
}

// Funções de Autenticação
function handleLogin() {
    clearError('login-error');
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) {
        showError('login-error', 'Por favor, preencha o usuário e a senha.');
        return;
    }

    if (user === 'aluno' && pass === 'fiap2025') {
        // Login com sucesso
        hideElement('login-screen');
        showElement('list-screen');
        document.getElementById('list-screen').classList.add('active');
        document.getElementById('login-screen').classList.remove('active');
        renderMarkets();
    } else {
        // Login falhou
        showError('login-error', 'Usuário ou senha incorretos.');
    }
}

function handleLogout() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    hideElement('list-screen');
    showElement('login-screen');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('list-screen').classList.remove('active');
    clearError('login-error');
}

// Funções do Mercado (Lista)
function onEditClick(event) {
    const index = parseInt(event.target.getAttribute('data-index'), 10);
    handleEdit(index);
}

function onRemoveClick(event) {
    const index = parseInt(event.target.getAttribute('data-index'), 10);
    handleRemove(index);
}

function renderMarkets() {
    const listElement = document.getElementById('markets-list');
    listElement.innerHTML = ''; // Limpa a lista atual

    if (markets.length === 0) {
        listElement.innerHTML = '<li class="market-item"><span class="market-text" style="color: var(--text-secondary)">Nenhum mercado encontrado. Adicione um acima!</span></li>';
        return;
    }

    for (let i = 0; i < markets.length; i++) {
        const itemText = markets[i];
        
        const li = document.createElement('li');
        li.className = 'market-item';
        
        const span = document.createElement('span');
        span.className = 'market-text';
        span.textContent = itemText;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'market-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Editar';
        editBtn.setAttribute('data-index', i);
        editBtn.addEventListener('click', onEditClick);
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'danger-btn';
        removeBtn.textContent = 'Remover';
        removeBtn.setAttribute('data-index', i);
        removeBtn.addEventListener('click', onRemoveClick);
        
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(removeBtn);
        
        li.appendChild(span);
        li.appendChild(actionsDiv);
        
        listElement.appendChild(li);
    }
}

function handleAddStart() {
    clearError('add-error');
    const inputEl = document.getElementById('new-market-input');
    const newValue = inputEl.value.trim();
    
    if (!newValue) {
        showError('add-error', 'O texto da previsão não pode estar vazio.');
        return;
    }
    
    markets.unshift(newValue);
    inputEl.value = '';
    renderMarkets();
}

function handleAddEnd() {
    clearError('add-error');
    const inputEl = document.getElementById('new-market-input');
    const newValue = inputEl.value.trim();
    
    if (!newValue) {
        showError('add-error', 'O texto da previsão não pode estar vazio.');
        return;
    }
    
    markets.push(newValue);
    inputEl.value = '';
    renderMarkets();
}

function handleRemove(index) {
    clearError('add-error');
    // Remove o item usando seu índice
    markets.splice(index, 1);
    renderMarkets();
}

function handleEdit(index) {
    clearError('add-error');
    const currentText = markets[index];
    const newText = prompt('Edite a previsão:', currentText);
    
    // Se cancelar (null), não altera
    if (newText === null) {
        return;
    }
    
    const trimmedText = newText.trim();
    // Se o valor estiver vazio, não salva e exibe erro
    if (!trimmedText) {
        showError('add-error', 'O item não pode estar vazio. A edição foi cancelada.');
        return;
    }
    
    markets[index] = trimmedText;
    renderMarkets();
}

// Funções de Eventos de Teclado
function onPasswordKeyPress(event) {
    if (event.key === 'Enter') {
        handleLogin();
    }
}

function onMarketInputKeyPress(event) {
    if (event.key === 'Enter') {
        handleAddEnd();
    }
}

// Inicialização
function initialize() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', onPasswordKeyPress);
    }
    
    const marketInput = document.getElementById('new-market-input');
    if (marketInput) {
        marketInput.addEventListener('keypress', onMarketInputKeyPress);
    }
}

// Chamada inicial para rodar ao carregar o script
initialize();
