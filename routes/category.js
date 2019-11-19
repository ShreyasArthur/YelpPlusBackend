var express = require("express")
var router = express.Router()
var helper = require("../helpers/category")

router.get("/", helper.getAllCategory)

module.exports = router
