const express = require("express")
const { signup, signin, findAccount } = require("../Controllers/AuthController")

const AuthRouter = express.Router()

AuthRouter.post("/signup",signup)
AuthRouter.post("/signin",signin)
AuthRouter.get("/FindAccount/:email",findAccount)

module.exports = AuthRouter