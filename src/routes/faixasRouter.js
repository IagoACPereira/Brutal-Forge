const express = require('express');
const { body, param } = require('express-validator');
const FaixasController = require('../controllers/FaixasController');

const faixasRouter = express.Router();

faixasRouter
  .post(
    '/faixas',
    [
      body('titulo').notEmpty().withMessage('Dados inválidos. É necessário um titulo para a nova faixa!'),
      body('titulo').isString().withMessage('Dados no formato inválido. É necessário que titulo seja String!'),

      body('tempo_reproducao').notEmpty().withMessage('Dados inválidos. É necessário um tempo de reprodução para a nova faixa!'),
      body('tempo_reproducao').isString().withMessage('Dados no formato inválido. É necessário que tempo de reprodução seja String!'),

      body('num_faixa').notEmpty().withMessage('Dados inválidos. É necessário um número da faixa para a nova faixa!'),
      body('num_faixa').isNumeric().withMessage('Dados no formato inválido. É necessário que número da faixa seja Numérico!'),

      body('album').notEmpty().withMessage('Dados inválidos. É necessário um id do album para a nova faixa!'),
      body('album').isString().withMessage('Dados no formato inválido. É necessário que id do album seja String!'),
      body('album').isByteLength({ min: 24 }).withMessage('O id do album tem que ter no mínimo 24 caracteres'),
      body('album').isByteLength({ max: 24 }).withMessage('O id do album tem que ter no máximo 24 caracteres'),
      body('album').isHexadecimal().withMessage('O id do album tem de ser hexadecimal'),
    ],
    FaixasController.adicionar,
  )
  .get('/faixas', FaixasController.exibirTodos)
  .get(
    '/faixas/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    FaixasController.exibirUm,
  )
  .put(
    '/faixas/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),

      body('titulo').notEmpty().withMessage('Dados inválidos. É necessário um titulo para a nova faixa!'),
      body('titulo').isString().withMessage('Dados no formato inválido. É necessário que titulo seja String!'),

      body('tempo_reproducao').notEmpty().withMessage('Dados inválidos. É necessário um tempo de reprodução para a nova faixa!'),
      body('tempo_reproducao').isString().withMessage('Dados no formato inválido. É necessário que tempo de reprodução seja String!'),

      body('num_faixa').notEmpty().withMessage('Dados inválidos. É necessário um número da faixa para a nova faixa!'),
      body('num_faixa').isNumeric().withMessage('Dados no formato inválido. É necessário que número da faixa seja Numérico!'),

      body('album').notEmpty().withMessage('Dados inválidos. É necessário um id do album para a nova faixa!'),
      body('album').isString().withMessage('Dados no formato inválido. É necessário que id do album seja String!'),
      body('album').isByteLength({ min: 24 }).withMessage('O id do album tem que ter no mínimo 24 caracteres'),
      body('album').isByteLength({ max: 24 }).withMessage('O id do album tem que ter no máximo 24 caracteres'),
      body('album').isHexadecimal().withMessage('O id do album tem de ser hexadecimal'),
    ],
    FaixasController.atualizar,
  )
  .delete(
    '/faixas/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    FaixasController.deletar,
  );

module.exports = faixasRouter;
