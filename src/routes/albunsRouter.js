const express = require('express');
const AlbunsController = require('../controllers/AlbunsController');

const albunsRouter = express.Router();

albunsRouter
  .post('/albuns', AlbunsController.adicionar)
  .get('/albuns', AlbunsController.exibirTodos)
  .get('/albuns/:id', AlbunsController.exibirUm)
  .put('/albuns/:id', AlbunsController.atualizar)
  .delete('/albuns/:id', AlbunsController.deletar);

module.exports = albunsRouter;
