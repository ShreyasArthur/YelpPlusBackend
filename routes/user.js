var express = require("express")
var router = express.Router()
var helper = require("../helpers/user")

router.get("/:user_id", helper.getUser)

module.exports = router