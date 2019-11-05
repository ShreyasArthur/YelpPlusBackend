var mongoose = require('mongoose')

var subCategorySchema = new mongoose.Schema({
    name: String
})

subCategorySchema.index({
    name: "text"
})

module.exports = mongoose.model("SubCategory", subCategorySchema)