const mongoose = require('mongoose');

const conexaoDb = mongoose.createConnection(process.env.STRING_CONEXAO_DB);

module.exports = conexaoDb;
