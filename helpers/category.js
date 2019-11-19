var db = require("../models")

exports.getAllCategory = function(req, res){
    db.Category.find({})
    .then(function(category){
        res.send(category)
    })
    .catch(function(err){
        console.log(err)
        res.send([])
    })
}