const { validationResult } = require('express-validator');
const Album = require('../models/Albuns');
const Erros = require('../erros');

class AlbunsController {
  static adicionar = async (req, res) => {
    try {
      const validacao = validationResult(req);

      if (!validacao.isEmpty()) {
        Erros.erroValidacao(res, validacao);
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
      Erros.erro500(res, error);
    }
  };

  static exibirTodos = async (req, res) => {
    try {
      const pagina = req.query.pagina || 1;
      const limite = req.query.limite || 10;

      const albuns = await Album
        .find()
        .skip((pagina - 1) * limite)
        .limit(limite);

      res.status(200).json(albuns);
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

        const album = await Album
          .findById(id);

        if (album) {
          res.status(200).json(album);
        } else {
          Erros.idNaoEncontrado(res, 'album', id);
          // res.json('em testes');
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
          Erros.idNaoEncontrado(res, 'album', id);
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

        const album = await Album.findById(id);

        if (album) {
          await Album.findByIdAndDelete(id);

          res.status(200).json({
            mensagem: `Album de id ${id} foi deletado com sucesso!`,
            status: 200,
          });
        } else {
          Erros.idNaoEncontrado(res, 'album', id);
        }
      }
    } catch (error) {
      Erros.erro500(res, error);
    }
  };
}

module.exports = AlbunsController;
