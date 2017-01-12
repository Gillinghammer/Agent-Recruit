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
            // break;
        case "2":
            console.log("game 2 submit")
            console.log(req.body.data.answer)
            if(req.body.data.answer.toLowerCase() === "belle" ) {
              Puzzles.findOne({ game: req.url.slice(-1) }, function (err, doc){
                doc.pass = true;
                doc.save();
                res.redirect("/")
              });
            } else {
              res.render("two", { msg: "Try Again!" })
            }

        case "3":
            console.log("game 3 submit")
            break;
        case "4":
            console.log("game 4 submit")
            break;
        default:
            console.log("default hit on switch statement...")
    }
  }
};