var mongoose = require('mongoose');
var Puzzles = require("../models/puzzle");

module.exports = {
  all: function(req, res){
    Puzzles.find({}, function(err, data){
        if(err) res.send(err);
        var completed = 0;
        for( var i = 0; i < data.length; ++i ){
          if( data[i].pass )
            completed++;
        }
        res.render("index", { data: data, complete: (completed/4)*100 } );
    });
  },
  update: function(req, res){
    switch( req.url.slice(-1) ) {
        case "1":
            if(req.body.data.birthDate === '1988-06-16' && req.body.data.passport === "N872598" && req.body.data.pizza === "Onions") {
                  console.log("yes!")
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
            console.log("game 2 submit")
            if(req.body.data.answer.toLowerCase() === "belle" ) {
              Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
                doc.pass = true;
                doc.save();
                res.redirect("/")
              });
            } else {
              res.render("two", { msg: "Try Again!" })
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
            console.log("game 4 submit")
            if(req.body.data.painter.toLowerCase() == "vincent van gogh") {
              Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
                doc.pass = true;
                doc.save();
                res.redirect("/")
              });
            } else {
              res.render("four", { msg: "Search for Reverse Image search tools, perhaps?" })
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

      res.redirect("/")
    });

  }
};