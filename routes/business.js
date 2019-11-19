var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/business")

router.get("/viewAll", helpers.getAllBusiness)
router.get("/viewByCategory/:id", helpers.getBusinessByCategory)
router.get("/view/:id", helpers.getABusiness)
router.get("/search/:word", helpers.searchBusiness)

module.exports = router