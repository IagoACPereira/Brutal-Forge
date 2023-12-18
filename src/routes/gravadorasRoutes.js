const express = require('express');
const GravadorasController = require('../controllers/GavadorasController');

const gravadorasRouter = express.Router();

gravadorasRouter
  .post('/gravadoras', GravadorasController.adicionar)
  .get('/gravadoras', GravadorasController.exibirTodos)
  .get('/gravadoras/:id', GravadorasController.exibirUm)
  .put('/gravadoras/:id', GravadorasController.atualizar)
  .delete('/gravadoras/:id', GravadorasController.deletar);

module.exports = gravadorasRouter;
