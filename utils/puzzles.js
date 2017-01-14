var mongoose = require('mongoose');
var Puzzles = require("../models/puzzle");
var Games = require("../models/game");

module.exports = {
  all: function(req, res){
    Puzzles.find({}, function(err, data){
        if(err) res.send(err);
        var completed = 0;
        for( var i = 0; i < data.length; ++i ){
          if( data[i].pass )
            completed++;
        }
        res.render("index", { data: data, complete: (completed/4)*100, start: res.locals.timer });
    });
  },
  update: function(req, res){
    switch( req.url.slice(-1) ) {
        case "1":
            if(req.body.data.birthDate === '1988-06-16' && req.body.data.passport === "N872598" && req.body.data.pizza === "Onions" && req.body.data.authcode === "4680") {

                  Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
                    doc.pass = true;
                    doc.save();
                    res.redirect("/")
                  });
                } else {
                  res.render("one", { msg: "Try Again!" })
                }
            break;
        case "2":
            if(req.body.data.answer.toLowerCase() === "breath" ) {
              Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
                doc.pass = true;
                doc.save();
                res.redirect("/")
              });
            } else {
              res.render("two", { msg: "Nope... here is a hint, I can hold it for over 2 minutes" })
            }
            break;
        case "3":
          if(req.body.distance <= 1 ) {
            Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
              doc.pass = true;
              doc.save();
              res.send({redirect: '/'});
            });
          } else {
            res.send({redirect: '/puzzles/3'});
          }
          break;
        case "4":
            if(req.body.data.answer.toLowerCase() == "gray318") {
              Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
                doc.pass = true;
                doc.save();
                res.redirect("/")
              });
            } else {
              res.render("four", { msg: "You'll find it on the back cover" })
            }
            break;
        default:
            console.log("default hit on switch statement...")
            break;
    }
  },
  reset: function(req, res){

    Puzzles.find({}, function (err, docs){
      docs.forEach(function(record) {
          record.pass = false;
          record.save()
      });
      Games.findOne({}, function (err, doc){
        doc.start = null;
        doc.save();
      });

      res.redirect("/")
    });

  }
};