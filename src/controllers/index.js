class Controller {
  static inicio = (req, res) => {
    res.status(200).json({
      mensagem: 'Brutal Forge a API de metal extremo mais cabulosa da internet!',
      status: 200,
    });
  };
}

module.exports = Controller;
