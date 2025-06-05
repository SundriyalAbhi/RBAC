const express = require("express")
const { AddAuthData, GetAuthData, DeleteAuthData } = require("../Controllers/AuthDataController")

const AuthDataRouter = express.Router()
AuthDataRouter.post("/addAuthData",AddAuthData)
AuthDataRouter.get("/getAuthData",GetAuthData)
AuthDataRouter.delete("/deleteAuthData",DeleteAuthData)

module.exports = AuthDataRouter