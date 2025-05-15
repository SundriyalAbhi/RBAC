const express = require("express")
const { Usersignup, Usersignin, UserfindAccount } = require("../Controllers/CompanyMemberController")

const UserAuthRouter = express.Router()

UserAuthRouter.post("/MemberSignup",Usersignup)
UserAuthRouter.post("/MemberSignin",Usersignin)
UserAuthRouter.get("/MemberFindAccount/:email",UserfindAccount)

module.exports = UserAuthRouter