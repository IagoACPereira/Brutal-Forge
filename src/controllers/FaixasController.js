const { validationResult } = require('express-validator');
const Faixa = require('../models/Faixas');
const Erros = require('../erros');

class FaixasController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
      } else {
        const novaFaixa = {
          titulo: req.body.titulo,
          tempo_reproducao: req.body.tempo_reproducao,
          num_faixa: req.body.num_faixa,
          album: req.body.album,
        };

        await Faixa.create(novaFaixa);

        res.status(201).json({
          mensagem: `Faixa ${novaFaixa.titulo} adicionado com sucesso!`,
          dados: novaFaixa,
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

      const faixas = await Faixa
        .find()
        .skip((pagina - 1) * limite)
        .limit(limite);

      res.status(200).json(faixas);
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

        const faixas = await Faixa.findById(id);

        if (faixas) {
          res.status(200).json(faixas);
        } else {
          Erros.idNaoEncontrado(res, 'faixa', id);
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

        const faixas = await Faixa.findById(id);

        if (faixas) {
          const atualizacaoFaixa = {
            titulo: req.body.titulo,
            tempo_reproducao: req.body.tempo_reproducao,
            num_faixa: req.body.num_faixa,
            album: req.body.album,
          };

          await Faixa.findByIdAndUpdate(id, atualizacaoFaixa);

          res.status(200).json({
            mensagem: `Faixa de id ${id} foi atualiado com sucesso!`,
            dados: atualizacaoFaixa,
            status: 200,
          });
        } else {
          Erros.idNaoEncontrado(res, 'faixa', id);
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

        const faixas = await Faixa.findById(id);

        if (faixas) {
          await Faixa.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `Faixa de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          Erros.idNaoEncontrado(res, 'faixa', id);
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };
}

module.exports = FaixasController;
