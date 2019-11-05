var mongoose = require('mongoose')

var userScehma = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email_id: String,
    password: String,
    reviews: [{type:mongoose.Schema.Types.ObjectId, ref:"Review"}],
})

var User = mongoose.model("User", userScehma)

module.exports = User