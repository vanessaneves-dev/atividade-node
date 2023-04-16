const express = require('express');
const app = express();
const { alunos, filtrarPorNome, filtrarPorMedia } = require('./alunos.js');

app.use(express.json());

app.get('/alunos', (req, res) => {
  const { nome, media } = req.query;

  if (nome) {
    const alunosFiltrados = filtrarPorNome(nome);
    if (alunosFiltrados.length === 0) {
      res.status(404).json({ message: 'Nenhum aluno encontrado com o nome informado.' });
    } else {
      res.json(alunosFiltrados);
    }
  } else if (media) {
    res.json(filtrarPorMedia(parseFloat(media)));
  } else {
    res.json(alunos);
  }
});

app.post('/alunos/novo', (req, res) =>  {
  const {nome, matricula, media} = req.body;

  if (
    typeof nome !== 'string' ||
    typeof matricula !== 'string' ||
    typeof media !== 'number'
  ) {
    return res.status(400).json({ error: 'Campos inválidos' });
  }
  // Verificar se a matrícula já existe
  const matriculaExistente = alunos.find((aluno) => aluno.matricula === matricula);
  if (matriculaExistente) {
    return res.status(400).json({ error: 'Matrícula já cadastrada' });
  }

  // Adicionar o novo aluno
  const novoAluno = { nome, matricula, media };
  alunos.push(novoAluno);

  // Retornar o aluno criado com status 201
  return res.status(201).json(novoAluno);
});

app.post('/alunos/deletar/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= alunos.length) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }

  const alunoRemovido = alunos.splice(index, 1)[0];
  return res.status(200).json({
    message: 'Aluno removido com sucesso',
    aluno: alunoRemovido
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta http://localhost:3000/");
});