const express = require('express');
const FaixasController = require('../controllers/FaixasController');

const faixasRouter = express.Router();

faixasRouter
  .post('/faixas', FaixasController.adicionar)
  .get('/faixas', FaixasController.exibirTodos)
  .get('/faixas/:id', FaixasController.exibirUm)
  .put('/faixas/:id', FaixasController.atualizar)
  .delete('/faixas/:id', FaixasController.deletar);

module.exports = faixasRouter;
