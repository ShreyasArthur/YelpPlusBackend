var express = require("express")
var router = express.Router()
var db = require("../models")
var helper = require("../helpers/category")

router.get("/", helper.getAllCategory)

module.exports = router
