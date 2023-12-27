const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { body, param } = require('express-validator');
const GenerosController = require('../controllers/GenerosController');

const generosRouter = express.Router();

generosRouter
  .post(
    '/generos',
    [
      body('nome').notEmpty().withMessage('Dados inválidos. É necessário um nome para o novo gênero!'),
      body('nome').isString().withMessage('Dados no formato inválido. É necessário que seja String!'),
    ],
    GenerosController.adicionar,
  )
  .get('/generos', GenerosController.exibirTodos)
  .get(
    '/generos/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    GenerosController.exibirUm,
  )
  .put(
    '/generos/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
      body('nome').notEmpty().withMessage('Dados inválidos. É necessário um nome para o novo gênero!'),
      body('nome').isString().withMessage('Dados no formato inválido. É necessário que seja String!'),
    ],
    GenerosController.atualizar,
  )
  .delete(
    '/generos/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    GenerosController.deletar,
  );

module.exports = generosRouter;
