const express = require("express")
const { GetActivityforAdmins, GetActivityforMember, storeActivity } = require("../Controllers/ActivityController")
const ActivityRouter = express.Router()

ActivityRouter.post("/storeactivity",storeActivity)
ActivityRouter.get("/getActivityforAdmins",GetActivityforAdmins)
ActivityRouter.get("/getActivityforMember",GetActivityforMember)

module.exports = ActivityRouter