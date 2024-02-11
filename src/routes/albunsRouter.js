const express = require('express');
const { body, param } = require('express-validator');
const AlbunsController = require('../controllers/AlbunsController');
const validarToken = require('../middlewares/validarToken');

const albunsRouter = express.Router();

albunsRouter
  .post(
    '/albuns',
    validarToken,
    [
      body('titulo').notEmpty().withMessage('Dados inválidos. É necessário um titulo para o novo album!'),
      body('titulo').isString().withMessage('Dados no formato inválido. É necessário que titulo seja String!'),

      body('ano_lancamento').notEmpty().withMessage('Dados inválidos. É necessário um ano de lançamento para o novo album!'),
      body('ano_lancamento').isNumeric().withMessage('Dados no formato inválido. É necessário que ano de lançamento seja Numérico!'),

      body('banda').notEmpty().withMessage('Dados inválidos. É necessário o id da banda para o novo album!'),
      body('banda').isString().withMessage('Dados no formato inválido. É necessário que o id da banda seja String!'),
      body('banda').isByteLength({ min: 24 }).withMessage('O id da banda tem que ter no mínimo 24 caracteres'),
      body('banda').isByteLength({ max: 24 }).withMessage('O id da banda tem que ter no máximo 24 caracteres'),
      body('banda').isHexadecimal().withMessage('O id da banda tem de ser hexadecimal'),

      body('gravadora').notEmpty().withMessage('Dados inválidos. É necessário o id da gravadora para o novo album!'),
      body('gravadora').isString().withMessage('Dados no formato inválido. É necessário que o id da gravadora seja String!'),
      body('gravadora').isByteLength({ min: 24 }).withMessage('O id da gravadora tem que ter no mínimo 24 caracteres'),
      body('gravadora').isByteLength({ max: 24 }).withMessage('O id da gravadora tem que ter no máximo 24 caracteres'),
      body('gravadora').isHexadecimal().withMessage('O id da gravadora tem de ser hexadecimal'),
    ],
    AlbunsController.adicionar,
  )
  .get('/albuns', AlbunsController.exibirTodos)
  .get(
    '/albuns/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    AlbunsController.exibirUm,
  )
  .put(
    '/albuns/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),

      body('titulo').notEmpty().withMessage('Dados inválidos. É necessário um titulo para alterar o album!'),
      body('titulo').isString().withMessage('Dados no formato inválido. É necessário que titulo seja String!'),

      body('ano_lancamento').notEmpty().withMessage('Dados inválidos. É necessário um ano de lançamento para alterar o album!'),
      body('ano_lancamento').isNumeric().withMessage('Dados no formato inválido. É necessário que ano de lançamento seja Numérico!'),

      body('banda').notEmpty().withMessage('Dados inválidos. É necessário o id da banda para alterar o album!'),
      body('banda').isString().withMessage('Dados no formato inválido. É necessário que o id da banda seja String!'),
      body('banda').isByteLength({ min: 24 }).withMessage('O id da banda tem que ter no mínimo 24 caracteres'),
      body('banda').isByteLength({ max: 24 }).withMessage('O id da banda tem que ter no máximo 24 caracteres'),
      body('banda').isHexadecimal().withMessage('O id da banda tem de ser hexadecimal'),

      body('gravadora').notEmpty().withMessage('Dados inválidos. É necessário o id da gravadora para alterar o album!'),
      body('gravadora').isString().withMessage('Dados no formato inválido. É necessário que o id da gravadora seja String!'),
      body('gravadora').isByteLength({ min: 24 }).withMessage('O id da gravadora tem que ter no mínimo 24 caracteres'),
      body('gravadora').isByteLength({ max: 24 }).withMessage('O id da gravadora tem que ter no máximo 24 caracteres'),
      body('gravadora').isHexadecimal().withMessage('O id da gravadora tem de ser hexadecimal'),
    ],
    AlbunsController.atualizar,
  )
  .delete(
    '/albuns/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    AlbunsController.deletar,
  );

module.exports = albunsRouter;
