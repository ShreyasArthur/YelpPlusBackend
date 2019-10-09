// libraries
var express = require('express')
var mongoose = require('mongoose')

// variables
var app = express()
var port = process.env.PORT || 4000

// DB Connection
mongoose.connect("mongodb://dom:njit1234@ds331558.mlab.com:31558/heroku_5hf0p9gc", {useNewUrlParser: true}, function(error){
    console.log(error)
})

// Schema
var userScehma = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    isOwner: Boolean
})

var user = mongoose.model("user", userScehma)

// var dom = new user({
//     first_name: "Justine",
//     last_name: "Ayroor",
//     email:"ja@gmail.com",
//     password: "1234",
//     isOwner: false
// })

// dom.save(function(err, user){
//     if(err) console.log(err)
//     else console.log("User inserted")
// })

// routes
app.get("/", function(req, res){
    res.send("Welcome to the homepage")
})

app.listen(port, function(){
    console.log("Server running on port:"+port)
})