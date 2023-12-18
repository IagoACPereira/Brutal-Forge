const Regiao = require('../models/Regioes');

class RegioesController {
  static adicionar = async (req, res) => {
    try {
      const novaRegiao = {
        pais: req.body.pais,
      };

      await Regiao.create(novaRegiao);

      res.status(201).json({
        mensagem: `Regiao ${novaRegiao.pais} adicionado com sucesso!`,
        dados: novaRegiao,
        status: 201,
      });
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
      const regioes = await Regiao.find();

      res.status(200).json(regioes);
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
      const { id } = req.params;

      const regiao = await Regiao.findById(id);

      res.status(200).json(regiao);
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
      const { id } = req.params;

      const atualizacaoRegiao = {
        pais: req.body.pais,
      };

      await Regiao.findByIdAndUpdate(id, atualizacaoRegiao);

      res.status(200).json({
        mensagem: `Regiao de id ${id} foi atualiado com sucesso!`,
        dados: atualizacaoRegiao,
        status: 200,
      });
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
      const { id } = req.params;

      await Regiao.findByIdAndDelete(id);

      res.status(200).json({
        mensagem: `A região de id ${id} foi deletado com sucesso!`,
        status: 200,
      });
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
