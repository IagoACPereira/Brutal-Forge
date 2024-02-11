const jwt = require('jsonwebtoken');

function validarToken(req, res, next) {
  const { authorization } = req.headers;

  try {
    jwt.verify(authorization, process.env.SEGREDO);

    next();
  } catch (error) {
    if (error.message === 'jwt must be provided') {
      res.status(401).json({
        mensagem: 'Não autorizado.',
        status: 401,
      });
    } else if (error.message === 'jwt expired') {
      res.status(401).json({
        mensagem: 'Token expirado.',
        status: 401,
      });
    } else {
      res.status(401).json({
        mensagem: error.message,
        status: 401,
      });
    }
  }
}

module.exports = validarToken;
