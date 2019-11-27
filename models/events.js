var mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
    date: Date,
    time: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    menu: [String],
    guest_Count: Number
})

module.exports = mongoose.model("Events", eventSchema)