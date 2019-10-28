var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    name: String,
    image_url: String
})

module.exports = mongoose.model("Category", categorySchema)