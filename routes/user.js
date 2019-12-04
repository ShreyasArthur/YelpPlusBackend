var express = require("express")
var router = express.Router()
var helper = require("../helpers/user")

router.get("/:user_id", helper.getUser)

router.post("/addFollowing/:user_id/:secondary_id", helper.followUser)

router.get("/getFollowing/:user_id", helper.getFollowingUsers)

module.exports = router