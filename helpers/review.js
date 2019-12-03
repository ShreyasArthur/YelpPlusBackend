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
            db.Business.findById(req.params.business_id).populate("review")
            .then(function(business){
                sum_product_rating = 0
                sum_service_rating = 0
                sum_ambience_rating = 0
                sum_price_rating = 0

                business.review.forEach(review =>{
                    sum_product_rating = sum_product_rating + review.product_rating
                    sum_service_rating = sum_service_rating + review.service_rating
                    sum_ambience_rating = sum_ambience_rating + review.ambience_rating
                    sum_price_rating = sum_price_rating + review.price_rating
                })

                sum_product_rating = sum_product_rating + parseInt(req.body.product_rating)
                sum_service_rating = sum_service_rating + parseInt(req.body.service_rating)
                sum_ambience_rating = sum_ambience_rating + parseInt(req.body.ambience_rating)
                sum_price_rating = sum_price_rating + parseInt(req.body.price_rating)

                avg_product_rating = sum_product_rating / (business.review.length+1)
                avg_service_rating = sum_service_rating / (business.review.length+1)
                avg_ambience_rating = sum_ambience_rating / (business.review.length+1)
                avg_price_rating = sum_price_rating / (business.review.length+1)

                avg_rating = (avg_product_rating+avg_service_rating+avg_ambience_rating) / 3

                business.avg_product_rating = parseInt(avg_product_rating)
                business.avg_service_rating = parseInt(avg_service_rating)
                business.avg_ambience_rating = parseInt(avg_ambience_rating)
                business.avg_price_rating = parseInt(avg_price_rating)
                business.avg_rating = parseInt(avg_rating)

                business.markModified("avg_product_rating")
                business.markModified("avg_service_rating")
                business.markModified("avg_ambience_rating")
                business.markModified("avg_price_rating")
                business.markModified("avg_rating")
                
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