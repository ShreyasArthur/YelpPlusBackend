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
    db.Business.find({category: req.params.id})
    .then(function(business){
        res.send(business)
    })
    .catch(function(err){
        console.log(err)
        res.send([])
    })
}

exports.getABusiness = function(req, res){
    db.Business.findById({_id: req.params.id}).populate("review", "product_rating service_rating ambience_rating price_rating data title description author").exec()
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
            db.Business.find({category: category_id}, "name address photo")
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
                    db.Business.find({sub_category: subCategory.id}, "name address photo")
                    .then(function(business){
                        res.send(business)
                    })
                    .catch(function(err){
                        console.log(err)
                        res.send([])
                    })
                }else{
                    db.Business.find({$text:{$search: req.params.word}}, "name address photo")
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