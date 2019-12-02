var mongoose = require('mongoose')

var userScehma = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email_id: String,
    password: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}]
})

var User = mongoose.model("User", userScehma)

module.exports = User