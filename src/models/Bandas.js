const conexaoDb = require('../config/conexaoDb');

const Banda = conexaoDb.model('banda', {
  nome: String,
  ano_formacao: Number,
  ativa: Boolean,
  genero: String,
  regiao: String,
  descricao: String,
});

module.exports = Banda;
