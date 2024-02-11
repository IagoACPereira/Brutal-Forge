const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Erros = require('../erros');
const Usuario = require('../models/Usuarios');

class AuthController {
  static logar = async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await Usuario
        .findOne()
        .where({ email });

      if (!usuario) {
        throw new Error('usuario');
      }

      const compararSenha = bcrypt.compareSync(senha, usuario.senha);

      if (!compararSenha) {
        throw new Error('senha');
      }

      const token = jwt.sign(
        {
          nome: usuario.nome,
          email: usuario.email,
        },
        process.env.SEGREDO,
        {
          algorithm: 'HS512',
          expiresIn: 60 * 60 * 24, // 24 Horas
        },
      );

      res.status(200).json({
        mensagem: 'Usuario permitido.',
        token,
      });
    } catch (error) {
      if (error.message === 'usuario') {
        res.status(401).json({
          mensagem: 'Email invalido!',
          status: 401,
        });
      } else if (error.message === 'senha') {
        res.status(401).json({
          mensagem: 'Senha incorreta!',
          status: 401,
        });
      } else {
        Erros.erro500(res, error);
      }
    }
  };
}

module.exports = AuthController;
