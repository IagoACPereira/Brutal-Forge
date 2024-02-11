const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Erros = require('../erros');
const Usuario = require('../models/Usuarios');

class UsuariosController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const { nome, email, senha } = req.body;

        const hash = await bcrypt.hashSync(senha, 10);

        const usuario = await Usuario.create({
          nome: nome.toLowerCase(),
          email: email.toLowerCase(),
          senha: hash,
        });

        res.status(201).json({
          mensagem: 'Usuario adicionado com sucesso.',
          dados: usuario,
          status: 201,
        });
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };

  static exibirTodos = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const pagina = req.query.pagina || 1;
        const limite = req.query.limite || 10;

        const usuarios = await Usuario
          .find()
          .skip((pagina - 1) * limite)
          .limit(limite);

        res.status(200).json(usuarios);
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };

  static exibirUm = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
          Erros.idNaoEncontrado(res, 'Usuario', id);
        } else {
          res.status(200).json(usuario);
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };

  static atualizar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
          Erros.idNaoEncontrado(res, 'Usuario', id);
        } else {
          const { nome, email, senha } = req.body;
          const hash = await bcrypt.hashSync(senha, 10);

          await Usuario.findByIdAndUpdate(id, {
            nome: nome.toLowerCase(),
            email: email.toLowerCase(),
            senha: hash,
          });

          res.status(200).json({
            mensagem: 'Usuario atualizado com sucesso.',
            status: 200,
          });
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };

  static deletar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
          Erros.idNaoEncontrado(res, 'Usuario', id);
        } else {
          await Usuario.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: 'Usuario deletado com sucesso.',
            status: 200,
          });
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };
}

module.exports = UsuariosController;
