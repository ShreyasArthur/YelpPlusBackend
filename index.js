// libraries
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// variables
var app = express()
var port = process.env.PORT || 4000

// DB Connection
mongoose.connect("mongodb://dom:njit1234@ds331558.mlab.com:31558/heroku_5hf0p9gc", {useNewUrlParser: true}, function(error){
    if(error) console.log(error)
})

// middleware
app.use(bodyParser.urlencoded({extended: true}))

// Schema
var userScehma = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    isOwner: Boolean
})

// Model
var User = mongoose.model("User", userScehma)
    
// routes
app.get("/", function(req, res){
    res.send("Welcome to the homepage")
})

// test route
app.get("/test", function(req, res){
    res.send({emailId: "dom@gmail.com", password: "1234"})
})

app.post("/registerUser", function(req, res){
    var user = new User({
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        email       : req.body.email,
        password    : req.body.password,
        isOwner     : req.body.isOwner
    })
    user.save(function(err){
        if(err) console.log("Something went wrong")
        else console.log("We saved user to db")
    })
    res.send("ok")
})

app.post("/loginUser", function(req, res){
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function(err, result){
        if(err) console.log("Error finding user")
        console.log(result)
    })
    res.send("ok")
})

app.listen(port, function(){
    console.log("Server running on port:"+port)
})