const express = require('express');
const { body, param } = require('express-validator');
const GravadorasController = require('../controllers/GavadorasController');
const validarToken = require('../middlewares/validarToken');

const gravadorasRouter = express.Router();

gravadorasRouter
  .post(
    '/gravadoras',
    validarToken,
    [
      body('nome').notEmpty().withMessage('Dados inválidos. É necessário um nome para a nova gravadora!'),
      body('nome').isString().withMessage('Dados no formato inválido. É necessário que nome seja String!'),
      body('regiao').notEmpty().withMessage('Dados inválidos. É necessário um região para a nova gravadora!'),
      body('regiao').isString().withMessage('Dados no formato inválido. É necessário que região seja String!'),
      body('regiao').isByteLength({ min: 24 }).withMessage('O id da região tem que ter no mínimo 24 caracteres'),
      body('regiao').isByteLength({ max: 24 }).withMessage('O id da região tem que ter no máximo 24 caracteres'),
      body('regiao').isHexadecimal().withMessage('O id da região tem de ser hexadecimal'),
    ],
    GravadorasController.adicionar,
  )
  .get('/gravadoras', GravadorasController.exibirTodos)
  .get(
    '/gravadoras/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    GravadorasController.exibirUm,
  )
  .put(
    '/gravadoras/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
      body('nome').notEmpty().withMessage('Dados inválidos. É necessário um nome para a nova região!'),
      body('nome').isString().withMessage('Dados no formato inválido. É necessário que nome seja String!'),
      body('regiao').notEmpty().withMessage('Dados inválidos. É necessário um região para a nova região!'),
      body('regiao').isString().withMessage('Dados no formato inválido. É necessário que região seja String!'),
      body('regiao').isByteLength({ min: 24 }).withMessage('O id da região tem que ter no mínimo 24 caracteres'),
      body('regiao').isByteLength({ max: 24 }).withMessage('O id da região tem que ter no máximo 24 caracteres'),
      body('regiao').isHexadecimal().withMessage('O id da região tem de ser hexadecimal'),
    ],
    GravadorasController.atualizar,
  )
  .delete(
    '/gravadoras/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    GravadorasController.deletar,
  );

module.exports = gravadorasRouter;
