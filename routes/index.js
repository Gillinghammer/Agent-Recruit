var express = require('express');
var router = express.Router();
var puzzles = require('../utils/puzzles');

/* GET home page. */
router.get('/', puzzles.all );

module.exports = router;
