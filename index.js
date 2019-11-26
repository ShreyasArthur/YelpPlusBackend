// libraries
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var User = require('./models/user')
var Business = require("./models/business")
var Category = require("./models/category")
var SubCategory = require("./models/subCategory")
var Review = require("./models/review")
var cloud = require('./cloudinary')
var upload = require('./multerConfig')

// variables
var app = express()
var port = process.env.PORT || 4000

// DB Connection
// mongoose.connect("mongodb://dom:njit1234@ds331558.mlab.com:31558/heroku_5hf0p9gc", {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
//     if(error) console.log(error)
// })

// middleware
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

// Routes
app.get("/", function(req, res){
    Category.find({}, function(err, categories){
        if(err) console.log(err)
        else{
            res.render("index", {categories: categories})
        }
    })
})

// test route
app.get("/test", function(req, res){
    res.send([{emailId: "dom@gmail.com", password: "1234"}])
})

// Route: Show Login Page
app.get("/login", function(req, res){
    res.render("login")
})

// Route: Show Register Page
app.get("/register", function(req, res){
    res.render("register")
})

// Route: Register User
app.post("/registerUser", function(req, res){
    User.findOne({
        email_id: req.body.email_id
    }, function(err, user){
        if(err) console.log("Something went wrong while registering")
        else{
            if(user == null){
                User.create({
                    first_name  : req.body.first_name,
                    last_name   : req.body.last_name,
                    email_id       : req.body.email_id,
                    password    : req.body.password,
                }, function(err, user){
                    if(err) console.log("Something went wrong while registering user")
                    else {
                        res.statusCode = 200
                        res.send(user)
                    }
                })
            }else{
                user = {}
                user["authenticationStatus"] = false
                res.send(user)
            }
        }
    })

})

// Route : Login
app.post("/loginUser", function(req, res){
    User.findOne({
        email_id: req.body.email_id,
        password: req.body.password,
    },"first_name last_name email_id", function(err, user){
        if(err) {
            console.log("Something went wrong while logging in")
        }else {
            if(user != null){
                user["authenticationStatus"] = true
                res.send(user)
            }else{
                user = {}
                user["authenticationStatus"] = false
                res.send(user)
            }
        }    
    })
})


// Route: Add new business Page
app.get("/business/new", function(req, res){
    Category.find({}, function(err, categories){
        if(err) console.log(err)
        else {
            SubCategory.find({}, function(err, subCategories){
                if(err) console.log(err)
                res.render("addBusiness", {categories: categories, subCategories: subCategories})
            })
        }
    })
})

// Route: View All Business Page
app.get("/show/:id", function(req, res){
    Business.find({category: req.params.id}).populate("category").exec(function(err, businesses){
        if(err) console.log(err)
        else res.render("show", {businesses: businesses})
    })
})

// Route: Insert New Business
app.post("/business/new", function(req, res){
    if(req.body.category == "5dc10e7b40b34347781b1183"){
        sub_category = req.body.sub_category
    }else{
        sub_category = null
    }
    Business.create({
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        category: req.body.category,
        sub_category: sub_category
    }, function(err, newBusiness){
        if(err) console.log(err)
            res.redirect("/business/new")
    })
})

// Route: Show add image page
app.get("/business/new/images/:id", function(req, res){
    res.render("addImage", {business_id: req.params.id})
})

// Route: Add images
app.post("/business/new/images/:id", function(req, res){
    Business.findById(req.params.id, function(err, business){
        if(err) console.log(err)
        else{
            req.body.image_url.forEach(function(image){
                if(image!="") business.photo.push(image)
            })
            business.save(function(err, business){
                if(err) console.log(err)
                else{
                    res.redirect("/business/view/"+business._id)
                }
            })
        }
    })
})

// Route: View A Business Page
app.get("/business/view/:id", function(req, res){
    var id = req.params.id
    Business.findById(id).populate("category").populate("review").exec(function(err, business){
        if(err) console.log(err)
        else {
            res.render("viewBusiness", {business: business})
        }
    })
})

// Route: Add New Category
app.post("/category/new", function(req, res){
    Category.create({
        name: req.body.name,
        image_url: req.body.image_url
    }, function(err, newCategory){
        if(err) console.log(newCategory)
        else res.send(newCategory.name+" has been added successfully")
    })
})

// Route: Add New Sub Category
app.post("/subCategory/new", function(req, res){
    SubCategory.create({
        name: req.body.name
    }, function(err, newSubCategory){
        if(err) console.log(err)
        else res.send(newSubCategory+" has been added successfully")
    })
})

// Route: View add review Page
app.get("/review/add/:id", function(req, res){
    res.render("addReview", {business_id: req.params.id})
})

// Route: Add new review
app.post("/review/new", function(req, res){
    Review.create({
        title: req.body.title,
        description: req.body.description,
        product_rating: req.body.product_rating,
        service_rating: req.body.service_rating,
        ambience_rating: req.body.ambience_rating,
        price_rating: req.body.price_rating
    },function(err, newReview){
        if(err) console.log(err)
        else {
            Business.findById(req.body.business_id, function(err, business){
                if(err) console.log(err)
                else{
                    business.review.push(newReview)
                    business.save(function(err, business){
                        if(err) console.log(err)
                        res.redirect("/business/view/"+business._id)
                    })
                }
            })
        }
    })
})

  ////////////////////////
 // Routes For Android //
///////////////////////

var userRoute = require("./routes/user")
var businessRoute = require("./routes/business")
var categoryRoute = require("./routes/category")
var reviewRoute = require("./routes/review")

app.use("/api/user", userRoute)
app.use("/api/business", businessRoute)
app.use("/api/category", categoryRoute)
app.use("/api/review", reviewRoute)

// Claim a business
app.post("/business/:id/claim/:email_id", function(req, res){
    User.findOne({email_id: req.params.email_id}, function(err, user){
        if(err) console.log(err)
        else{
            Business.findOneAndUpdate({_id: req.params.id}, {$set:{claimed: true, owner: user}}, function(err, business){
                if(err) console.log(err)
                else{
                    user.owned_business.push(business)
                    user.save(function(err){
                        if(err) console.log(err)
                        else{
                            res.status(200)
                            res.send({"status":"ok"})
                        }
                    })
                }
            })
        }
    })
})

app.post("/business/:id/register/event/:email_id", function(req, res){
    User.findOne({email_id: req.params.email_id}, function(err, user){
        if(err) console.log(err)
        Business.findOneAndUpdate({owner:user._id}, {$set:{event_booking: true}}, function(err, business){
            if(err) console.log(err)
            else{
                res.status(200)
                res.send({"status":"ok"});
            }
        })
    })
})

app.get("/checkImage", function(req, res){
    res.render("imageUpload")
})

app.post("/getImage",upload.any(), cloud.uploadImage)

app.listen(port, function(){
    console.log("Server running on port:"+port)
})

// TODO:
// 1. Remove cloudinary integration from here, since we are uploading files directly to the server.
// 2. Take the uploaded img url from the android app and insert it in the photos url array list for the specific business.
// 3. Only one image can be uploaded at a time right now, which meets the requirement.