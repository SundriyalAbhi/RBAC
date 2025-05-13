const express = require("express")
const { body} = require('express-validator');
const { Providersignin, Providersignup, ProviderfindAccount } = require("../Controllers/ProviderAuthController");
const validate = require("../Middlewares/authenticator");


const ProviderAuthRouter = express.Router()

ProviderAuthRouter.post("/Providersignup",[
  body("email").isEmail().normalizeEmail(), 
  body("password").isLength({ min: 6 }).trim(),     
  body("username").escape().trim()
],validate,Providersignup)
ProviderAuthRouter.post("/Providersignin",Providersignin)
ProviderAuthRouter.get("/ProviderFindAccount/:email",ProviderfindAccount)

module.exports = ProviderAuthRouter