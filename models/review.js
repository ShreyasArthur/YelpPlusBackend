var mongooose = require('mongoose')

var reviewSchema = new mongooose.Schema({
    title: String,
    description: String,
    date: Date,
    rating: Number,
    photo: [String],
})

module.exports = mongooose.model("Review", reviewSchema)