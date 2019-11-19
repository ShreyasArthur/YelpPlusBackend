var db = require("../models")

exports.getReviewByUserId = function(req, res){
    db.Review.find({user: req.params.user_id})
    .then(function(review){
        res.send(review)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.postReview = function(req, res){
    db.User.findById(req.params.user_id)
    .then(function(user){
        db.Review.create({
            user: user,
            author: user.first_name+" "+user.last_name,
            title: req.body.title,
            description: req.body.description,
            product_rating: req.body.product_rating,
            service_rating: req.body.service_rating,
            ambience_rating: req.body.ambience_rating,
            price_rating: req.body.price_rating,
            date: Date.now(),
        })
        .then(function(newReview){
            db.Business.findById(req.params.business_id)
            .then(function(business){
                business.review.push(newReview)
                business.save()
                .then(function(business){
                    res.status(200)
                    res.send({"status": "ok"})
                })
                .catch(function(err){
                    console.log(err)
                })
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}