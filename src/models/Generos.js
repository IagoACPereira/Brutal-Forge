const conexaoDb = require('../config/conexaoDb');

const Genero = conexaoDb.model('generos', {
  nome: String,
});

module.exports = Genero;
