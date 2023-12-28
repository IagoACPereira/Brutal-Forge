const express = require('express');
const { body, param } = require('express-validator');
const RegioesController = require('../controllers/RegioesController');

const regioesRouter = express.Router();

regioesRouter
  .post(
    '/regioes',
    [
      body('pais').notEmpty().withMessage('Dados inválidos. É necessário um pais para a nova região!'),
      body('pais').isString().withMessage('Dados no formato inválido. É necessário que seja String!'),
    ],
    RegioesController.adicionar,
  )
  .get(
    '/regioes',

    RegioesController.exibirTodos,
  )
  .get(
    '/regioes/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    RegioesController.exibirUm,
  )
  .put(
    '/regioes/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
      body('pais').notEmpty().withMessage('Dados inválidos. É necessário um pais para a nova região!'),
      body('pais').isString().withMessage('Dados no formato inválido. É necessário que seja String!'),
    ],
    RegioesController.atualizar,
  )
  .delete(
    '/regioes/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    RegioesController.deletar,
  );

module.exports = regioesRouter;
 