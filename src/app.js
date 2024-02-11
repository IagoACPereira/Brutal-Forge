const express = require('express');
const router = require('./routes/index');
const generosRouter = require('./routes/generosRoutes');
const regioesRouter = require('./routes/regioesRoutes');
const gravadorasRouter = require('./routes/gravadorasRoutes');
const albunsRouter = require('./routes/albunsRouter');
const bandasRouter = require('./routes/bandasRouter');
const faixasRouter = require('./routes/faixasRouter');
const Erros = require('./erros');
const usuariosRouter = require('./routes/usuariosRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app
  .use(
    express.json(),
    express.urlencoded({
      extended: true,
    }),
  )
  .use(
    '/brutal-forge',
    router,
    authRouter,
    usuariosRouter,
    albunsRouter,
    bandasRouter,
    faixasRouter,
    generosRouter,
    regioesRouter,
    gravadorasRouter,
  )
  .use(Erros.erro404);

module.exports = app;
