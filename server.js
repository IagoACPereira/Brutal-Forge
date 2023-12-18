// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const application = require('./src/app');

const app = express();
const porta = process.env.PORTA;

application(app);

app.listen(porta, () => {
  console.log(`Servidor escutando porta ${porta}`);
});
