var mongooose = require('mongoose')

var reviewSchema = new mongooose.Schema({
    author: String,
    title: String,
    description: String,
    date: Date,
    product_rating: Number,
    service_rating: Number,
    ambience_rating: Number,
    price_rating: Number,
    photo: [String],
    business: {type:mongooose.Schema.Types.ObjectId, ref:"Business"}
})

module.exports = mongooose.model("Review", reviewSchema)