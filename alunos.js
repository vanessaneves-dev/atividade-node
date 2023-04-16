const express = require("express");
const fs = require('fs');

const router = express.Router();

// alunos.js
const alunos = [
  { nome: 'Vanessa Neves', matricula: '001', media: 10.0 },
  { nome: 'Laura Xavier', matricula: '002', media: 9.0 },
  { nome: 'Mariana Oliveira', matricula: '003', media: 7.0 },
  { nome: 'Ana Pereira', matricula: '004', media: 6.0 },
  { nome: 'Pedro Souza', matricula: '005', media: 5.5 },
  { nome: 'Lucas Carvalho', matricula: '006', media: 7.8 },
  { nome: 'Carolina Santos', matricula: '007', media: 9.5 },
  { nome: 'Miguel Rocha', matricula: '008', media: 4.0 },
  { nome: 'Bruno Almeida', matricula: '009', media: 7.5 },
  { nome: 'Isabella Costa', matricula: '010', media: 8.7 },
];


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



router.post('/novo', (req, res) =>  {
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

router.delete('/:index', (req, res) => {
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

router.put('/:index', (req, res) => {

  const index = parseInt(req.params.index);
  console.log(req.body)

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

module.exports = {router, alunos};