const conexaoDb = require('../config/conexaoDb');

const Gravadora = conexaoDb.model('gravadoras', {
  nome: String,
  regiao: String,
});

module.exports = Gravadora;
