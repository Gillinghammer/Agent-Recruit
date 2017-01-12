var mongoose = require('mongoose');
var Puzzles = require("../models/puzzle");

module.exports = {
  all: function(req, res){
    Puzzles.find({}, function(err, data){
        if(err) res.send(err);
        res.render("index", { data } );
    });
  },
  update: function(req, res){
    console.log("req params: ", req.url.slice(-1) )
    console.log("req body", req.body)
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
  }
};