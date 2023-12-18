const conexaoDb = require('../config/conexaoDb');

const Album = conexaoDb.model('albuns', {
  titulo: String,
  ano_lancamento: Number,
  link_youtube: String,
  link_spotify: String,
  link_deezer: String,
  banda: String,
  gravadora: String,
});

module.exports = Album;
