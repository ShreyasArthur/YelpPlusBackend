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

exports.followUser = function(req, res){
    db.User.findById(req.params.user_id)
    .then(function(user){
        user.following.push(req.body.secondary_id)
        user.save(function(err){
            if(err) console.log(err)
            else res.send({success: true})
        })
    })
    .catch(function(err){
        console.log(err)
    })
}