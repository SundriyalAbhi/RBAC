const express = require("express")
const { Providersignin, Providersignup, ProviderfindAccount } = require("../Controllers/ProviderAuthController")


const ProviderAuthRouter = express.Router()

AuthRouter.post("/Providersignup",Providersignup)
AuthRouter.post("/Providersignin",Providersignin)
AuthRouter.get("/ProviderFindAccount/:email",ProviderfindAccount)

module.exports = ProviderAuthRouter