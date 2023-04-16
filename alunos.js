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

function filtrarPorNome(nome) {
  return alunos.filter((aluno) => aluno.nome.includes(nome));

}

function filtrarPorMedia(mediaMinima) {
  return alunos.filter((aluno) => aluno.media >= mediaMinima);
}

module.exports = {
  alunos,
  filtrarPorNome,
  filtrarPorMedia,
};