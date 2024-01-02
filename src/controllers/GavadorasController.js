const { validationResult } = require('express-validator');
const Gravadora = require('../models/Gravadoras');
const Erros = require('../erros');

class GravadorasController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const novaGravadora = {
          nome: req.body.nome,
          regiao: req.body.regiao,
        };

        await Gravadora.create(novaGravadora);

        res.status(201).json({
          mensagem: `Gravadora ${novaGravadora.nome} adicionado com sucesso!`,
          dados: novaGravadora,
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
        const gravadoras = await Gravadora.find();

        res.status(200).json(gravadoras);
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

        const gravadora = await Gravadora.findById(id);

        if (gravadora) {
          res.status(200).json(gravadora);
        } else {
          res.status(400).json({
            mensagem: `Não existe gravadora com o id ${id}`,
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

        const gravadora = await Gravadora.findById(id);

        if (gravadora) {
          const atualizacaoGravadora = {
            nome: req.body.nome,
            regiao: req.body.regiao,
          };

          await Gravadora.findByIdAndUpdate(id, atualizacaoGravadora);

          res.status(200).json({
            mensagem: `Gravadora de id ${id} foi atualiado com sucesso!`,
            dados: atualizacaoGravadora,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe gravadora com o id ${id}`,
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

        const gravadora = await Gravadora.findById(id);

        if (gravadora) {
          await Gravadora.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `gravadora de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe gravadora com o id ${id}`,
            status: 400,
          });
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };
}

module.exports = GravadorasController;
