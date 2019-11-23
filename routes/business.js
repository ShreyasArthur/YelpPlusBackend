var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/business")

router.get("/viewAll", helpers.getAllBusiness)
router.get("/viewByCategory/:id", helpers.getBusinessByCategory)
router.get("/view/:id", helpers.getABusiness)
router.get("/search/:word", helpers.searchBusiness)
router.get("/reviews/:business_id", helpers.getReviewForBusiness)


router.put("/claimBusiness/:business_id/:user_id", helpers.claimBusiness)
router.put("/enableEventBooking/:business_id", helpers.enableEventBooking)

module.exports = router