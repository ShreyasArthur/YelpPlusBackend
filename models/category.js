var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    name: String,
    image_url: String
})

categorySchema.index({
    name: "text"
})

module.exports = mongoose.model("Category", categorySchema)