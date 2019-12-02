var mongoose = require('mongoose')

var eventSchema = new mongoose.Schema({
    date: Date,
    time: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    menu: [String],
    guest_Count: Number,
    business_id: {type:mongoose.Schema.Types.ObjectId, ref:"Business"}
})

module.exports = mongoose.model("Events", eventSchema)