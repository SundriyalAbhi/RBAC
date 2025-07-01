const express = require("express")
const { StoreSessionData, GetSessionData, DeleteSessionData } = require("../Controllers/SessionDataController")



const SessionDataRouter = express.Router()
SessionDataRouter.post("/storesessiondata",StoreSessionData)
SessionDataRouter.get("/getsessiondata",GetSessionData)
SessionDataRouter.delete("/deletesessiondata",DeleteSessionData)

module.exports = SessionDataRouter