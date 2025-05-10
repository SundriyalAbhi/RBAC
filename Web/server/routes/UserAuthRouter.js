const express = require("express")
const { signup, signin, findAccount, Usersignup, Usersignin, UserfindAccount } = require("../Controllers/UserAuthController")

const UserAuthRouter = express.Router()

AuthRouter.post("/Usersignup",Usersignup)
AuthRouter.post("/Usersignin",Usersignin)
AuthRouter.get("/UserFindAccount/:email",UserfindAccount)

module.exports = UserAuthRouter