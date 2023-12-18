const Gravadora = require('../models/Gravadoras');

class GravadorasController {
  static adicionar = async (req, res) => {
    try {
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
      const gravadoras = await Gravadora.find();

      res.status(200).json(gravadoras);
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

      const gravadora = await Gravadora.findById(id);

      res.status(200).json(gravadora);
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

      await Gravadora.findByIdAndDelete(id);

      res.status(200).json({
        mensagem: `gravadora de id ${id} foi deletado com sucesso!`,
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

module.exports = GravadorasController;
