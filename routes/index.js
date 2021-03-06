var express = require('express');
var router = express.Router();
var puzzles = require('../utils/puzzles');
var mongoose = require('mongoose');
var Games =  require('../models/game');
var Call =  require('../models/call');

router.post('/phone', function(req,res,next){
  Call.remove({ }, function (err) {
    if (err) return handleError(err);
  });
  Call.create({
    recording: req.body.RecordingUrl,
    number: req.body.Caller
  }, function (err, recording) {
    if (err) return handleError(err);
  })
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end("<?xml version='1.0' encoding='UTF-8'?><Response><Say voice='alice' language='en'>Analyzing voice now. Voice authentication complete. Sending your authorization code now.</Say><Sms from='+441133204793' to='" + req.body.Caller + "'> authorization code: 4680 </Sms></Response>");
});


router.get('/congrats', function(req,res,next){
  Call.findOne({}, function (err, doc){
    res.render('congrats', { url: doc.recording } )
  });
});

/* GET home page. */
router.get('/', function(req,res,next){
  Games.findOne({}, function (err, doc){
    if(doc.start === null ) {
      res.render('welcome');
    } else {
      res.redirect('/dashboard')
    }
  });
});
router.get('/dashboard', puzzles.all );
router.get('/reset', puzzles.reset )
router.get('/game', function(req,res) {
  Games.findOne({}, function (err, doc){
    res.send(doc); 
  });
})
router.get('/call', function(req,res) {
  Call.findOne({}, function (err, doc){
    res.send(doc); 
  });
})
router.post('/start',function(req,res) {
  Games.findOne({}, function (err, doc){
    if(doc.start === null ) {
      doc.start = new Date()
      doc.save(); 
      res.send({body: "start time set"}) 
    } else {
      res.send({body: "game already in progress"})
    }
  });
} )

module.exports = router;
