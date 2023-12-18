const conexaoDb = require('../config/conexaoDb');

const Regiao = conexaoDb.model('regioes', {
  pais: String,
});

module.exports = Regiao;
