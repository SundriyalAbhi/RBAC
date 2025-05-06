const express = require("express")
const { sendOTP, verifyOTP } = require("../Controllers/OTPController")


const OTPRouter = express.Router()

OTPRouter.post("/sentOTP",sendOTP)
OTPRouter.post("/verifyOTP",verifyOTP)

module.exports = OTPRouter