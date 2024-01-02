const express = require('express');
const router = require('./routes/index');
const generosRouter = require('./routes/generosRoutes');
const regioesRouter = require('./routes/regioesRoutes');
const gravadorasRouter = require('./routes/gravadorasRoutes');
const albunsRouter = require('./routes/albunsRouter');
const bandasRouter = require('./routes/bandasRouter');
const faixasRouter = require('./routes/faixasRouter');
const Erros = require('./erros');

function application(app) {
  app.use(
    express.json(),
    express.urlencoded({
      extended: true,
    }),
  );

  app.use(
    '/brutal-forge',
    router,
    albunsRouter,
    bandasRouter,
    faixasRouter,
    generosRouter,
    regioesRouter,
    gravadorasRouter,
  );

  app.use(Erros.erro404);
}

module.exports = application;
