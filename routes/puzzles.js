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
router.post('/2', puzzles.update );

router.get('/3', function(req, res, next) {
  res.render('three');
});
router.post('/3', puzzles.update );

router.get('/4', function(req, res, next) {
  res.render('four');
});
router.post('/4', puzzles.update );

module.exports = router;
