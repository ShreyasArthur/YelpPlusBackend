var mongoose = require("mongoose")

mongoose.connect("mongodb://dom:njit1234@ds331558.mlab.com:31558/heroku_5hf0p9gc", {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
    if(error) console.log(error)
})

// mongoose.Promise = Promise

module.exports.Business = require("./business")
module.exports.Category = require("./category")
module.exports.SubCategory = require("./subCategory")
module.exports.User = require("./user")
module.exports.Review = require("./review")
