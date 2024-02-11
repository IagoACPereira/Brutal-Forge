const { Router } = require('express');
const { body, param } = require('express-validator');
const validarToken = require('../middlewares/validarToken');
const UsuariosController = require('../controllers/UsuariosController');

const usuariosRouter = Router();

usuariosRouter
  .post(
    '/usuarios',
    validarToken,
    [
      body('nome').notEmpty().withMessage('Nome é obrigatório.'),
      body('nome').isString().withMessage('Nome tem de ser String.'),
      body('email').notEmpty().withMessage('Email é obrigatório.'),
      body('email').isString().withMessage('Email tem de ser String.'),
      body('senha').notEmpty().withMessage('Senha é obrigatório.'),
      body('senha').isString().withMessage('Senha tem de ser String.'),
    ],
    UsuariosController.adicionar,
  )
  .get('/usuarios', validarToken, UsuariosController.exibirTodos)
  .get(
    '/usuarios/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    UsuariosController.exibirUm,
  )
  .put(
    '/usuarios/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
      body('nome').notEmpty().withMessage('Nome é obrigatório.'),
      body('nome').isString().withMessage('Nome tem de ser String.'),
      body('email').notEmpty().withMessage('Email é obrigatório.'),
      body('email').isString().withMessage('Email tem de ser String.'),
      body('senha').notEmpty().withMessage('Senha é obrigatório.'),
      body('senha').isString().withMessage('Senha tem de ser String.'),
    ],
    validarToken,
    UsuariosController.atualizar,
  )
  .delete(
    '/usuarios/:id',
    validarToken,
    [
      param('id').isByteLength({ min: 24 }).withMessage('O id tem que ter no mínimo 24 caracteres'),
      param('id').isByteLength({ max: 24 }).withMessage('O id tem que ter no máximo 24 caracteres'),
      param('id').isHexadecimal().withMessage('O id tem de ser hexadecimal'),
    ],
    validarToken,
    UsuariosController.deletar,
  );

module.exports = usuariosRouter;
