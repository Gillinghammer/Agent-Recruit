var mongoose = require("mongoose");

var gameSchema = mongoose.Schema({
    start: Date 
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;