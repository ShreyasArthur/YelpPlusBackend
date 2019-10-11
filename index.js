// libraries
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var User = require('./models/user')

// variables
var app = express()
var port = process.env.PORT || 4000

// DB Connection
mongoose.connect("mongodb://dom:njit1234@ds331558.mlab.com:31558/heroku_5hf0p9gc", {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
    if(error) console.log(error)
})

// middleware
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.get("/", function(req, res){
    res.send("Welcome to the homepage")
})

// test route
app.get("/test", function(req, res){
    res.send([{emailId: "dom@gmail.com", password: "1234"}])
})

app.post("/registerUser", function(req, res){
    User.create({
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        email       : req.body.email,
        password    : req.body.password,
        isOwner     : req.body.isOwner
    }, function(err, user){
        if(err) console.log("Something went wrong while registering user")
        else console.log("User inserted")
    })
    res.send("ok")
})

// login route
app.post("/loginUser", function(req, res){
    User.findOne({
        email: req.body.email,
        password: req.body.password 
    }, function(err, user){
        if(err) console.log("Something went wrong while logging in")
        else res.send(user)    
    })
})

app.listen(port, function(){
    console.log("Server running on port:"+port)
})