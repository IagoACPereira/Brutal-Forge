const { validationResult } = require('express-validator');
const Album = require('../models/Albuns');

class AlbunsController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        res.status(400).send({
          erro: validacao.array(),
          status: 400,
        });
      } else {
        const novoAlbum = {
          titulo: req.body.titulo,
          ano_lancamento: req.body.ano_lancamento,
          link_youtube: req.body.link_youtube || null,
          link_spotify: req.body.link_spotify || null,
          link_deezer: req.body.link_deezer || null,
          banda: req.body.banda,
          gravadora: req.body.gravadora,
        };

        await Album.create(novoAlbum);

        res.status(201).json({
          mensagem: `Album ${novoAlbum.titulo} adicionado com sucesso!`,
          dados: novoAlbum,
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
        const albuns = await Album.find();

        res.status(200).json(albuns);
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

        const album = await Album.findById(id);

        if (album) {
          res.status(200).json(album);
        } else {
          res.status(400).json({
            mensagem: `Não existe album com o id ${id}`,
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

        const album = await Album.findById(id);

        if (album) {
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
        } else {
          res.status(400).json({
            mensagem: `Não existe album com o id ${id}`,
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

        const album = await Album.findById(id);

        if (album) {
          await Album.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `Album de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          res.status(400).json({
            mensagem: `Não existe album com o id ${id}`,
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

module.exports = AlbunsController;
