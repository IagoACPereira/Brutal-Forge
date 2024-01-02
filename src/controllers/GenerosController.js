// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');
const Genero = require('../models/Generos');
const Erros = require('../erros');

class GenerosController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const novoGenero = {
          nome: req.body.nome,
        };

        await Genero.create(novoGenero);

        res.status(201).json({
          mensagem: `Genero ${novoGenero.nome} adicionado com sucesso!`,
          dados: novoGenero,
          status: 201,
        });
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };

  static exibirTodos = async (req, res) => {
    try {
      const pagina = req.query.pagina || 1;
      const limite = req.query.limite || 10;

      const generos = await Genero
        .find()
        .skip((pagina - 1) * limite)
        .limit(limite);

      res.status(200).json(generos);
    } catch (error) {
      res.status(500).json({
        mensagem: 'Ocorreu um erro interno no servidor!',
        erro: error,
        status: 500,
      });
    }
  };

  static exibirUm = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const { id } = req.params;

        const genero = await Genero.findById(id);

        if (genero) {
          res.status(200).json(genero);
        } else {
          res.status(400).json({
            mensagem: `Não existe genero com o id ${id}`,
            status: 400,
          });
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

        const atualizacaoGenero = {
          nome: req.body.nome,
        };

        const genero = await Genero.findById(id);

        if (genero) {
          await Genero.findByIdAndUpdate(id, atualizacaoGenero);

          res.status(200).json({
            mensagem: `Genero de id ${id} foi atualiado com sucesso!`,
            dados: atualizacaoGenero,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe genero com o id ${id}`,
            status: 400,
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

        const genero = await Genero.findById(id);

        if (genero) {
          await Genero.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `O gênero de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe genero com o id ${id}`,
            status: 400,
          });
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };
}

module.exports = GenerosController;
