const Banda = require('../models/Bandas');

class BandasController {
  static adicionar = async (req, res) => {
    try {
      const novaBanda = {
        nome: req.body.nome,
        ano_formacao: req.body.ano_formacao,
        ativa: req.body.ativa,
        genero: req.body.genero,
        regiao: req.body.regiao,
        descricao: req.body.descricao,
      };

      await Banda.create(novaBanda);

      res.status(201).json({
        mensagem: `Banda ${novaBanda.nome} adicionado com sucesso!`,
        dados: novaBanda,
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
      const bandas = await Banda.find();

      res.status(200).json(bandas);
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

      const banda = await Banda.findById(id);

      res.status(200).json(banda);
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

      const atualizacaoBanda = {
        nome: req.body.nome,
        ano_formacao: req.body.ano_formacao,
        ativa: req.body.ativa,
        genero: req.body.genero,
        regiao: req.body.regiao,
        descricao: req.body.descricao,
      };

      await Banda.findByIdAndUpdate(id, atualizacaoBanda);

      res.status(200).json({
        mensagem: `Banda de id ${id} foi atualiado com sucesso!`,
        dados: atualizacaoBanda,
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

      await Banda.findByIdAndDelete(id);

      res.status(200).json({
        mensagem: `Banda de id ${id} foi deletado com sucesso!`,
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

module.exports = BandasController;
