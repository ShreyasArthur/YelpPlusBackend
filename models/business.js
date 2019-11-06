var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
    name: String,
    phone_number: Number,
    address: String,
    photo:[String],
    image_logo: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    review: [{type: mongoose.Schema.Types.ObjectId, ref:"Review"}],
    sub_category: [{type: mongoose.Schema.Types.ObjectId, ref:"SubCategory"}],
    claimed: {
        type: Boolean,
        default: false
    },
    owner: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    event_booking:{
        type: Boolean,
        default: false
    }
})

businessSchema.index({
    name: "text"
})

module.exports = mongoose.model("Business", businessSchema)