const { validationResult } = require('express-validator');
const Regiao = require('../models/Regioes');

class RegioesController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const novaRegiao = {
          pais: req.body.pais,
        };

        await Regiao.create(novaRegiao);

        res.status(201).json({
          mensagem: `Regiao ${novaRegiao.pais} adicionado com sucesso!`,
          dados: novaRegiao,
          status: 201,
        });
      }
    } catch (error) {
      res.status(500).json({
        mensagem: 'Ocorreu um erro interno no servidor!',
        erro: error,
        status: 500,
      });
    }
  };

  static exibirTodos = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const regioes = await Regiao.find();

        res.status(200).json(regioes);
      }
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
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const { id } = req.params;

        const regiao = await Regiao.findById(id);

        if (regiao) {
          res.status(200).json(regiao);
        } else {
          res.status(400).json({
            mensagem: `Não existe regiao com o id ${id}`,
            status: 400,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        mensagem: 'Ocorreu um erro interno no servidor!',
        erro: error,
        status: 500,
      });
    }
  };

  static atualizar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const { id } = req.params;

        const regiao = await Regiao.findById(id);

        if (regiao) {
          const atualizacaoRegiao = {
            pais: req.body.pais,
          };

          await Regiao.findByIdAndUpdate(id, atualizacaoRegiao);

          res.status(200).json({
            mensagem: `Regiao de id ${id} foi atualiado com sucesso!`,
            dados: atualizacaoRegiao,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe regiao com o id ${id}`,
            status: 400,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        mensagem: 'Ocorreu um erro interno no servidor!',
        erro: error,
        status: 500,
      });
    }
  };

  static deletar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const { id } = req.params;

        const regiao = await Regiao.findById(id);

        if (regiao) {
          await Regiao.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `A região de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe regiao com o id ${id}`,
            status: 400,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        mensagem: 'Ocorreu um erro interno no servidor!',
        erro: error,
        status: 500,
      });
    }
  };
}

module.exports = RegioesController;
