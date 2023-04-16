# Projeto Alunos

Autor: Vanessa Neves

Este projeto consiste em um sistema de gerenciamento de alunos usando Node.js e Express. O projeto contém um módulo `alunos.js` que exporta um array de alunos, uma função que filtra pelo nome e uma que filtra pela média (maior ou igual).

## Rotas

- `GET /alunos`: Lista todos os alunos. Contém query opcional para filtrar por nome e por média.

- `POST /alunos/novo`: Recebe um objeto (nome, matrícula e média) e adiciona um novo aluno ao array de dados. Validação dos campos é realizada e, caso contrário, retorna um erro (400).

- `POST /alunos/deletar/:index`: Recebe o índice do aluno a ser removido do array de dados. Trata a chamada caso o aluno não exista (404).

- `POST /alunos/atualizar/:index`: Recebe o índice do aluno e um objeto (nome, média) e atualiza os dados do aluno na posição indicada. Trata a chamada caso o aluno não exista (404).

## Desafios

- Desafio 0: Escrever um arquivo JSON chamado `db.json` toda vez que ocorrer uma alteração nos dados do array de alunos.

- Desafio 1: Refatorar a aplicação e mover para `alunos.js` os métodos de deletar, adicionar e atualizar um aluno.

- Desafio 2: Substituir as rotas POST de atualizar e deletar com os métodos PUT e DELETE respectivamente, reformulando as URLs para todas utilizarem o mesmo caminho `/alunos`, mudando apenas o método utilizado.

- Desafio 3: Entregar a documentação desta API usando os recursos do Postman.

- Desafio 4: Pesquisar e aplicar o logger morgan na aplicação.

## Formato de entrega

Repositório no Github.

##Documentação API Postman
https://documenter.getpostman.com/view/26815809/2s93XyUP1g