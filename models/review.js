var mongooose = require('mongoose')

var reviewSchema = new mongooose.Schema({
    user: {
        type: mongooose.Schema.ObjectId, ref:"User"
    },
    author: String,
    title: String,
    description: String,
    date: Date,
    product_rating: Number,
    service_rating: Number,
    ambience_rating: Number,
    price_rating: Number,
    photo: [String]
})

module.exports = mongooose.model("Review", reviewSchema)