var db = require("../models")

exports.getAllBusiness = function(req, res){
    db.Business.find({})
    .then(function(business){
        res.send(business)
    })
    .catch(function(err){
        console.log(err)
        res.send([])
    })
}

exports.getBusinessByCategory = function(req, res){
    db.Business.find({category: req.params.id}, "name address photo event_booking_status avg_price_rating")
    .then(function(business){
        res.send(business)
    })
    .catch(function(err){
        console.log(err)
        res.send([])
    })
}

exports.getABusiness = function(req, res){
    db.Business.findById({_id: req.params.id}, "name phone_number address photo review claimed event_booking_status owner avg_product_rating avg_service_rating avg_ambience_rating avg_price_rating avg_rating").populate("review", "product_rating service_rating ambience_rating price_rating date title description author user").exec()
    .then(function(business){
        res.send(business)
    })
    .catch(function(err){
        console.log(err)
        res.send([])
    })
}

exports.searchBusiness = function(req, res){
    db.Category.findOne({$text: {$search: req.params.word}})
    .then(function(category){
        if(category!=null){
            db.Business.find({category: category.id}, "name address photo event_booking_status avg_price_rating")
            .then(function(business){
                if(business!=null){
                    res.send(business)
                }else{
                    res.send([])
                }
            })
            .catch(function(err){
                console.log(err)
                res.send([])
            })
        }else{
            db.SubCategory.findOne({$text: {$search: req.params.word}})
            .then(function(subCategory){
                if(subCategory != null){
                    db.Business.find({sub_category: subCategory.id}, "name address photo event_booking_status avg_price_rating")
                    .then(function(business){
                        res.send(business)
                    })
                    .catch(function(err){
                        console.log(err)
                        res.send([])
                    })
                }else{
                    db.Business.find({$text:{$search: req.params.word}}, "name address photo event_booking_status avg_price_rating")
                    .then(function(business){
                        res.send(business)
                    })
                    .catch(function(err){
                        console.log(err)
                        res.send([])
                    })
                }
            })
            .catch(function(err){
                console.log(err)
                res.send([])
            })
        }
    })
    .catch(function(err){
        console.log(err)
        res.send([])
    })
}

exports.claimBusiness = function(req, res){
    db.User.findById(req.params.user_id)
    .then(function(user){
        db.Business.findOneAndUpdate({_id: req.params.business_id}, {$set:{claimed: true, owner: user}})
        .then(function(business){
            res.status(200)
            res.send({success: true})
        })
        .catch(function(err){
            console.log(err)
            res.send({success: false})
        })
    })
    .catch(function(err){
        console.log(err)
        res.send("error")
    })
}

exports.enableEventBooking = function(req, res){
    db.Business.findOneAndUpdate({_id: req.params.business_id}, {$set:{event_booking_status: true}})
    .then(function(business){
        res.status(200)
        res.send({success : true})
    })
    .catch(function(err){
        console.log(err)
        res.send({success : false})
    })
}

exports.getReviewForBusiness = function(req, res){
    db.Business.findById(req.params.business_id, "review").populate("review")
    .then(function(review){
        res.send(review)
    })
    .catch(function(err){
        console.log(err)
    })
}

exports.addImage = function(req, res){
    db.Business.findById(req.params.business_id)
    .then(function(business){
        business.photo.push(req.body.url)
        business.save(function(err, business){
            if(err){
                console.log("error while pushing image to db")
                res.send({success: false})
            }
            else{
                res.send({success: true})
            }
        })
    })
    .catch(function(err){
        console.log(err)
        res.send({success: false})
    })
}