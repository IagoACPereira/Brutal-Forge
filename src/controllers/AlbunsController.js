const Album = require('../models/Albuns');

class AlbunsController {
  static adicionar = async (req, res) => {
    try {
      const novoAlbum = {
        titulo: req.body.titulo,
        ano_lancamento: req.body.ano_lancamento,
        link_youtube: req.body.link_youtube,
        link_spotify: req.body.link_spotify,
        link_deezer: req.body.link_deezer,
        banda: req.body.banda,
        gravadora: req.body.gravadora,
      };

      await Album.create(novoAlbum);

      res.status(201).json({
        mensagem: `Album ${novoAlbum.titulo} adicionado com sucesso!`,
        dados: novoAlbum,
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
      const albuns = await Album.find();

      res.status(200).json(albuns);
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

      const album = await Album.findById(id);

      res.status(200).json(album);
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

      const atualizacaoAlbum = {
        titulo: req.body.titulo,
        ano_lancamento: req.body.ano_lancamento,
        link_youtube: req.body.link_youtube,
        link_spotify: req.body.link_spotify,
        link_deezer: req.body.link_deezer,
        banda: req.body.banda,
        gravadora: req.body.gravadora,
      };

      await Album.findByIdAndUpdate(id, atualizacaoAlbum);

      res.status(200).json({
        mensagem: `Album de id ${id} foi atualiado com sucesso!`,
        dados: atualizacaoAlbum,
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

      await Album.findByIdAndDelete(id);

      res.status(200).json({
        mensagem: `Album de id ${id} foi deletado com sucesso!`,
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

module.exports = AlbunsController;
