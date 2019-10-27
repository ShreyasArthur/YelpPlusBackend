var mongoose = require('mongoose')

var subCategorySchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model("SubCategory", subCategorySchema)