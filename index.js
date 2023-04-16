const express = require('express');
const app = express();
const fs = require('fs');
const { alunos, filtrarPorNome, filtrarPorMedia } = require('./alunos.js');

app.use(express.json());

function salvarAlunos(alunos) {
  const data = JSON.stringify(alunos, null, 2);
  fs.writeFile('db.json', data, (err) => {
    if (err) {
      console.error('Erro ao salvar os dados dos alunos:', err);
    } else {
      console.log('Dados dos alunos salvos com sucesso em db.json');
    }
  });
}


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
 
  const matriculaExistente = alunos.find((aluno) => aluno.matricula === matricula);
  if (matriculaExistente) {
    return res.status(400).json({ error: 'Matrícula já cadastrada' });
  }

 
  const novoAluno = { nome, matricula, media };
  alunos.push(novoAluno);

  salvarAlunos(alunos);  
  return res.status(201).json(novoAluno);
});

app.post('/alunos/deletar/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= alunos.length) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }

  const alunoRemovido = alunos.splice(index, 1)[0];

  salvarAlunos(alunos);
  return res.status(200).json({
    message: 'Aluno removido com sucesso',
    aluno: alunoRemovido
  });
});

app.post('/alunos/atualizar/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const { nome, media } = req.body;

  if (isNaN(index) || index < 0 || index >= alunos.length) {
    return res.status(404).json({ error: 'Aluno não encontrado' });
  }

  if (nome) {
    alunos[index].nome = nome;
  }
  
  if (media) {
    alunos[index].media = media;
  }

  // inclui uma atualização da matricula com base no index da atualização acima
  alunos[index].matricula = (index + 1).toString().padStart(3, '0');

  salvarAlunos(alunos);
  return res.status(200).json(alunos[index]);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta http://localhost:3000/");
});