var express = require('express')
var router = express.Router()
var db = require("../models")
var helpers = require("../helpers/event")

router.post("/createEvent/:user_id/:business_id", helpers.createEvent)
router.get("/getEvents/:user_id",helpers.getEvent)

router.get("/getAllEvents/:business_id", helpers.getEventByBusiness)

module.exports = router