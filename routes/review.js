var express = require("express")
var router = express.Router()
var helpers = require("../helpers/review")

router.get("/:user_id", helpers.getReviewByUserId)
router.post("/:business_id/:user_id", helpers.postReview)

module.exports = router