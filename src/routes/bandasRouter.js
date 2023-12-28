const express = require('express');
const { body, param } = require('express-validator');
const BandasController = require('../controllers/BandasController');

const bandasRouter = express.Router();

bandasRouter
  .post(
    '/bandas',
    [
      body('nome').notEmpty().withMessage('Dados inválidos. É necessário um nome para a nova banda!'),
      body('nome').isString().withMessage('Dados no formato inválido. É necessário que nome seja String!'),

      body('ano_formacao').notEmpty().withMessage('Dados inválidos. É necessário um ano de formação para a nova banda!'),
      body('ano_formacao').isNumeric().withMessage('Dados no formato inválido. É necessário que ano de formação seja Number!'),

      body('ativa').notEmpty().withMessage('Dados inválidos. É necessário informar se a banda está ativa para a novo registro!'),
      body('ativa').isBoolean().withMessage('Dados no formato inválido. É necessário que que campo ativa sejá um Boolean!'),

      body('genero').notEmpty().withMessage('Dados inválidos. É necessário o id do genero para a nova banda!'),
      body('genero').isString().withMessage('Dados no formato inválido. É necessário que o id do genero seja String!'),
      body('genero').isByteLength({ min: 24 }).withMessage('O id do genero tem que ter no mínimo 24 caracteres'),
      body('genero').isByteLength({ max: 24 }).withMessage('O id do genero tem que ter no máximo 24 caracteres'),
      body('genero').isHexadecimal().withMessage('O id do genero tem de ser hexadecimal'),

      body('regiao').notEmpty().withMessage('Dados inválidos. É necessário o id da regiao para a nova banda!'),
      body('regiao').isString().withMessage('Dados no formato inválido. É necessário que nome seja String!'),
      body('regiao').isByteLength({ min: 24 }).withMessage('O id da regiao tem que ter no mínimo 24 caracteres'),
      body('regiao').isByteLength({ max: 24 }).withMessage('O id da regiao tem que ter no máximo 24 caracteres'),
      body('regiao').isHexadecimal().withMessage('O id da regiao tem de ser hexadecimal'),

      body('descricao').notEmpty().withMessage('Dados inválidos. É necessário uma descrição para a nova banda!'),
      body('descricao').isString().withMessage('Dados no formato inválido. É necessário que descrição seja String!'),
    ],
    BandasController.adicionar,
  )
  .get('/bandas', BandasController.exibirTodos)
  .get(
    '/bandas/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    BandasController.exibirUm,
  )
  .put(
    '/bandas/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),

      body('nome').notEmpty().withMessage('Dados inválidos. É necessário um nome para alterar a banda!'),
      body('nome').isString().withMessage('Dados no formato inválido. É necessário que nome seja String!'),

      body('ano_formacao').notEmpty().withMessage('Dados inválidos. É necessário um ano de formação para alterar a banda!'),
      body('ano_formacao').isNumeric().withMessage('Dados no formato inválido. É necessário que ano de formação seja Number!'),

      body('ativa').notEmpty().withMessage('Dados inválidos. É necessário informar se a banda está ativa para a novo registro!'),
      body('ativa').isBoolean().withMessage('Dados no formato inválido. É necessário que que campo ativa sejá um Boolean!'),

      body('genero').notEmpty().withMessage('Dados inválidos. É necessário o id do genero para alterar a banda!'),
      body('genero').isString().withMessage('Dados no formato inválido. É necessário que o id do genero seja String!'),
      body('genero').isByteLength({ min: 24 }).withMessage('O id do genero tem que ter no mínimo 24 caracteres'),
      body('genero').isByteLength({ max: 24 }).withMessage('O id do genero tem que ter no máximo 24 caracteres'),
      body('genero').isHexadecimal().withMessage('O id do genero tem de ser hexadecimal'),

      body('regiao').notEmpty().withMessage('Dados inválidos. É necessário o id da regiao para alterar a banda!'),
      body('regiao').isString().withMessage('Dados no formato inválido. É necessário que nome seja String!'),
      body('regiao').isByteLength({ min: 24 }).withMessage('O id da regiao tem que ter no mínimo 24 caracteres'),
      body('regiao').isByteLength({ max: 24 }).withMessage('O id da regiao tem que ter no máximo 24 caracteres'),
      body('regiao').isHexadecimal().withMessage('O id da regiao tem de ser hexadecimal'),

      body('descricao').notEmpty().withMessage('Dados inválidos. É necessário uma descrição para alterar a banda!'),
      body('descricao').isString().withMessage('Dados no formato inválido. É necessário que descrição seja String!'),
    ],
    BandasController.atualizar,
  )
  .delete(
    '/bandas/:id',
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    BandasController.deletar,
  );

module.exports = bandasRouter;
