var mongoose = require("mongoose");

var callSchema = mongoose.Schema({
    recording: String,
    number: String
});

var Call = mongoose.model('call', callSchema);

module.exports = Call;