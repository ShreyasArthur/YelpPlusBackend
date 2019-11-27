var db = require("../models")

exports.createEvent = function(req, res){
    db.User.findById(req.params.user_id)
    .then(function(user){
        if(user!=null){
            db.Events.create({
                date: req.body.date,
                time: req.body.time,
                user: user,
                guest_count: req.body.guest_count
            }).then(function(event){
                var menuItems = req.body.menu
                
                menuItems.forEach(item => {
                    event.menu.push(item)
                });
                    
                event.save(function(err){
                    if(err) console.log("Error while pushing menu items ",err)
                })
                db.Business.findById(req.params.business_id)
                .then(function(business){
                    business.event.push(event)
                    business.save(function(err){
                        if(err) console.log("Error while inserting oid to business", err)
                    })
                    res.send({sucess:true})
                }).catch(function(err){
                    console.log("Error while finding the business", err)
                })
            }).catch(function(err){
                console.log("Error while creating event "+err)
            })
        }
    })
    .catch(function(err){
        console.log("Error while finding user "+err)
    })   
}

exports.getEvent = function(req, res){
    db.User.findById(req.params.user_id)
    .then(function(user){
        db.Events.find({user: user._id})
        .then(function(event){
            res.send(event)
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
}