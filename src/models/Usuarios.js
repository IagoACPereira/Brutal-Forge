const conexaoDb = require('../config/conexaoDb');

const Usuario = conexaoDb.model('usuarios', {
  nome: String,
  email: String,
  senha: String,
});

module.exports = Usuario;
