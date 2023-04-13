// alunos.js
const alunos = [
  { id: 1, nome: 'Vanessa Neves', media: 10.0 },
  { id: 8, nome: 'Laura Xavier', media: 9.0 },
  { id: 2, nome: 'Mariana Oliveira', media: 7.0 },
  { id: 3, nome: 'Ana Pereira', media: 6.0 },
  { id: 4, nome: 'Pedro Souza', media: 5.5 },
  { id: 5, nome: 'Lucas Carvalho', media: 7.8 },
  { id: 6, nome: 'Carolina Santos', media: 9.5 },
  { id: 7, nome: 'Miguel Rocha', media: 4.0 },
  { id: 9, nome: 'Bruno Almeida', media: 7.5 },
  { id: 10, nome: 'Isabella Costa', media: 8.7 },
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