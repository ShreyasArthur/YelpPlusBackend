var db = require("../models")

exports.getUser = function(req, res){
    db.User.findOne({_id: req.params.user_id})
    .then(function(user){
        res.send(user)
    })
    .catch(function(err){
        console.log(err)
    })
}