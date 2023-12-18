const express = require('express');
const Controller = require('../controllers/index');

const router = express.Router();

router.get('/', Controller.inicio);

module.exports = router;
