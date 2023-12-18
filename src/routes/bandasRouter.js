const express = require('express');
const BandasController = require('../controllers/BandasController');

const bandasRouter = express.Router();

bandasRouter
  .post('/bandas', BandasController.adicionar)
  .get('/bandas', BandasController.exibirTodos)
  .get('/bandas/:id', BandasController.exibirUm)
  .put('/bandas/:id', BandasController.atualizar)
  .delete('/bandas/:id', BandasController.deletar);

module.exports = bandasRouter;
