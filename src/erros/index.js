class Erros {
  static erro404 = (req, res, next) => {
    res.status(404).json({
      mensagem: 'Este EndPoint não existe. Favor verifique a requisição',
      status: 404,
    });

    next();
  };

  static erro500 = (res, erro) => {
    res.status(500).json({
      mensagem: 'Ocorreu um erro interno no servidor!',
      erro,
      status: 500,
    });
  };

  static erroValidacao = (res, validacao) => {
    res.status(400).send({
      erro: validacao.array(),
      status: 400,
    });
  };
}

module.exports = Erros;
