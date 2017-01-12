var mongoose = require("mongoose");

var puzzleSchema = mongoose.Schema({
    game: { type: [Number], unique: true }, 
    pass: Boolean,
    icon: String,
    url: Number
});

var Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;