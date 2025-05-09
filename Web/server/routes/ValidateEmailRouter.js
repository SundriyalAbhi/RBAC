const express = require("express")
const { checkEmail } = require("../Controllers/ValidateEmailController")
const validateEmailRouter = express.Router()

validateEmailRouter.post("/validateEmail",checkEmail)

module.exports = validateEmailRouter