const express = require('express');
const { alunos, filtrarPorNome, filtrarPorMedia } = require('./alunos.js');

const app = express();

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




app.listen(3000, () => {
  console.log("Servidor rodando na porta http://localhost:3000/");
});