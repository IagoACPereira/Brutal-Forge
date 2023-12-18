const conexaoDb = require('../config/conexaoDb');

const Faixa = conexaoDb.model('faixas', {
  titulo: String,
  tempo_reproducao: String,
  num_faixa: Number,
  album: String,
});

module.exports = Faixa;
