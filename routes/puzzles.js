var express = require('express');
var router = express.Router();
var puzzles = require('../utils/puzzles');

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/1', function(req, res, next) {
  res.render('one');
});
router.post('/1', puzzles.update );

router.get('/2', function(req, res, next) {
  res.render('two');
});
router.get('/3', function(req, res, next) {
  res.send('puzzle three template');
});
router.get('/4', function(req, res, next) {
  res.send('puzzle four template');
});

module.exports = router;
