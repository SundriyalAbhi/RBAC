const express = require("express")
const { Usersignup, Usersignin, UserfindAccount } = require("../Controllers/CompanyMemberController")

const UserAuthRouter = express.Router()

UserAuthRouter.post("/Usersignup",Usersignup)
UserAuthRouter.post("/Usersignin",Usersignin)
UserAuthRouter.get("/UserFindAccount/:email",UserfindAccount)

module.exports = UserAuthRouter