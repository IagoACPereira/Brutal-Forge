const { validationResult } = require('express-validator');
const Faixa = require('../models/Faixas');

class FaixasController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const novaFaixa = {
          titulo: req.body.titulo,
          tempo_reproducao: req.body.tempo_reproducao,
          num_faixa: req.body.num_faixa,
          album: req.body.album,
        };

        // await Faixa.create(novaFaixa);

        res.status(201).json({
          mensagem: `Faixa ${novaFaixa.titulo} adicionado com sucesso!`,
          dados: novaFaixa,
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
        const faixas = await Faixa.find();

        res.status(200).json(faixas);
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

        const faixas = await Faixa.findById(id);

        if (faixas) {
          res.status(200).json(faixas);
        } else {
          res.status(400).json({
            mensagem: `Não existe faixas com o id ${id}`,
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

        const faixas = await Faixa.findById(id);

        if (faixas) {
          const atualizacaoFaixa = {
            titulo: req.body.titulo,
            tempo_reproducao: req.body.tempo_reproducao,
            num_faixa: req.body.num_faixa,
            album: req.body.album,
          };

          // await Faixa.findByIdAndUpdate(id, atualizacaoFaixa);

          res.status(200).json({
            mensagem: `Faixa de id ${id} foi atualiado com sucesso!`,
            dados: atualizacaoFaixa,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe faixas com o id ${id}`,
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

        const faixas = await Faixa.findById(id);

        if (faixas) {
          // await Faixa.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `Faixa de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe faixas com o id ${id}`,
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

module.exports = FaixasController;
