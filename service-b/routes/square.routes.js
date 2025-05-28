const express = require('express');
const { getSquare } = require('../controllers/square.controller');

const router = express.Router();
router.get('/square/:num', getSquare);

module.exports = router;
