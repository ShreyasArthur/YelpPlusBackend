var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
    name: String,
    phone_number: Number,
    address: String,
    photo:[String],
    category: {type: mongoose.Schema.Types.ObjectId, ref:"Category"},
    review: [{type: mongoose.Schema.Types.ObjectId, ref:"Review"}],
    sub_category: [{type: mongoose.Schema.Types.ObjectId, ref:"SubCategory"}],
    claimed: {
        type: Boolean,
        default: false
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId, ref:"User"
    },
    event_booking_status:{
        type: Boolean,
        default: false
    },
    event: [{type:mongoose.Schema.Types.ObjectId, ref:"Events"}],
    menu: [String],
    locations:{
        lat: Number,
        long: Number
    }
})

businessSchema.index({
    name: "text"
})

module.exports = mongoose.model("Business", businessSchema)