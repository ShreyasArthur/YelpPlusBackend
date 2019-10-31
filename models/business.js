var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
    name: String,
    phone_number: Number,
    address: String,
    photo:[String],
    image_logo: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    review: [{type: mongoose.Schema.Types.ObjectId, ref:"Review"}],
    sub_category: [{type: mongoose.Schema.Types.ObjectId, ref:"SubCategory"}]
})

businessSchema.index({
    name: "text"
})

module.exports = mongoose.model("Business", businessSchema)