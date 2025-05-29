const express = require("express")
const { Usersignup, Usersignin, UserfindAccount, UpdateUserDetails } = require("../Controllers/CompanyMemberController")

const MemberRouter = express.Router()

MemberRouter.post("/MemberSignup",Usersignup)
MemberRouter.post("/MemberSignin",Usersignin)
MemberRouter.get("/MemberFindAccount/:email",UserfindAccount)
MemberRouter.put("/UpdateMember",UpdateUserDetails)

module.exports = MemberRouter