const express = require('express');
const RegioesController = require('../controllers/RegioesController');

const regioesRouter = express.Router();

regioesRouter
  .post('/regioes', RegioesController.adicionar)
  .get('/regioes', RegioesController.exibirTodos)
  .get('/regioes/:id', RegioesController.exibirUm)
  .put('/regioes/:id', RegioesController.atualizar)
  .delete('/regioes/:id', RegioesController.deletar);

module.exports = regioesRouter;
