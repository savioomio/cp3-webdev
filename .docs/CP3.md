# CP3 - CRUD e IA Generativa

**Vídeo base:** [https://www.youtube.com/watch?v=cAcGrs7RHBM](https://www.youtube.com/watch?v=cAcGrs7RHBM)

# Entrega

---

A atividade será entregue:

- De forma **individual**
- **Na tarefa do Teams**
- Deve conter:
    - **Link para o vídeo** (publicar no Youtube como não listado)
    - **Link do repositório** do projeto no Github (pode deixar público ou caso privado, me adicionar como colaborador). Estrutura sugerida:
        
        repositorio/
                   index.html
                   script.js
                   style.css
                   prompts.md (explicado mais abaixo)
        

# Proposta

---

Você vai criar uma aplicação web com **tema livre** que simula um sistema simples de cadastro de itens. A aplicação deve ter uma tela de login e, após autenticação, exibir a lista com as operações de CRUD.

O tema da lista é sua escolha: filmes assistidos, jogos favoritos, lista de compras, ideias de projeto, ou qualquer outro que faça sentido para você.

---

## O que a aplicação deve ter

### Tela de login

A aplicação começa com o formulário de login visível e a lista oculta.

As credenciais corretas são:

- **Usuário:** `aluno`
- **Senha:** `fiap2025`

Se as credenciais estiverem corretas, a tela de login deve redirecionar para a página da lista. Se estiverem erradas, uma mensagem de erro deve aparecer na tela — não apenas no console.

### Lista com CRUD completo

Após o login, o usuário pode:

- **Adicionar** um item ao final da lista
- **Adicionar** um item ao início da lista
- **Ver** todos os itens exibidos dinamicamente na tela
- **Editar** qualquer item individualmente
- **Remover** qualquer item individualmente

Toda vez que a lista muda, a tela deve ser atualizada automaticamente para refletir o estado atual dos dados. A lista deve conter pelo menos **3 itens iniciais**, que serão exibidos ao carregar a primeira vez a página.

---

## Requisitos obrigatórios

- A aplicação deve ser desenvolvida com HTML, CSS e JavaScript puro — sem frameworks ou bibliotecas externas
- Os dados devem ser armazenados em um array de strings — sem uso de objetos dentro do array
- A lógica deve ser organizada em funções nomeadas — sem código solto fora de funções, exceto a declaração de variáveis e a chamada inicial de renderização
- Somente são aceitos comandos e recursos abordados em aula ou presentes nos materiais e apostilas da disciplina — qualquer recurso diferente deve ser justificado no vídeo com uma explicação clara do que ele faz e por que foi necessário
- O estudante deve aparecer obrigatoriamente no vídeo, de forma a evitar narrações feitas por IA

---

## Validações obrigatórias

- Os campos de login não podem ser enviados vazios
- Nenhum item pode ser salvo com o campo vazio — a mensagem de erro deve aparecer na tela
- Ao editar um item, se o usuário cancelar ou confirmar com o campo vazio, o item original deve permanecer sem alteração
- A remoção de um item deve considerar sua posição na lista, não o seu valor — para evitar que itens com o mesmo texto sejam removidos ao mesmo tempo

---

## Uso de inteligência artificial

Você deve consultar **três IAs diferentes** e pedir para cada uma gerar uma solução para o mesmo problema.

O prompt deve ser claro, seguir as boas práticas da engenharia de prompt e conter os requisitos técnicos da atividade. Após receber as três respostas, escolha uma como base para o seu projeto — podendo modificá-la — e explique no vídeo suas decisões.

Entregue também um arquivo `prompts.md` contendo:

- Os nomes das três IAs consultadas
- O prompt usado — inicial e final, caso tenha refinado
- Um comentário curto sobre os principais problemas encontrados em cada resposta
- A justificativa da IA escolhida como base

---

### Vídeo (máx. 5 minutos)

Sugestão de roteiro:

1. **(até 30s)** Apresente o tema da lista e os requisitos principais
2. **(até 1min)** Mostre o prompt usado e explique se fez refinamentos
3. **(até 1min30s)** Compare as três respostas — o que cada IA acertou, errou ou ignorou
4. **(até 1min)** Explique qual código escolheu como base e quais ajustes fez
5. **(até 1min)** Demonstre a aplicação funcionando: login, adição ao final, adição ao início, edição, remoção e pelo menos uma validação