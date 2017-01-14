var express = require('express');
var router = express.Router();
var puzzles = require('../utils/puzzles');
var mongoose = require('mongoose');
var Games =  require('../models/game');
var Call =  require('../models/call');


router.post('/phone', function(req,res,next){
  // console.log("request body: ", req.body)
  Call.remove({ }, function (err) {
    if (err) return handleError(err);
    // removed!
  });
  Call.create({
    recording: req.body.RecordingUrl,
    number: req.body.Caller
  }, function (err, recording) {
    if (err) return handleError(err);
    console.log("saved call to db", recording )

  })
  res.send({"Content-Type": "text/xml", "status": 200, "statusCode": 200 })
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
router.post('/start',function(req,res) {
  Games.findOne({}, function (err, doc){
    console.log(doc)
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
