const express = require("express")
const { body} = require('express-validator');
const { Providersignin, Providersignup, ProviderfindAccount, getAllAdminsforProvider, GetAllCompanyforProvider, GetCompanyByName, GetAdminByCompanyName, GetCompanyDetailsforProvider, GetAdminDetailsforProvider } = require("../Controllers/ProviderController");
const validate = require("../Middlewares/authenticator");


const ProviderRouter = express.Router()

ProviderRouter.post("/Providersignup",[
  body("email").isEmail().normalizeEmail(), 
  body("password").isLength({ min: 6 }).trim(),     
  body("username").escape().trim()
],validate,Providersignup)
ProviderRouter.post("/Providersignin",Providersignin)
ProviderRouter.get("/ProviderFindAccount/:email",ProviderfindAccount)
ProviderRouter.get("/AllAdmins",getAllAdminsforProvider)
ProviderRouter.get("/GetAllCompany",GetAllCompanyforProvider)
ProviderRouter.get("/GetAdminByCompanyName",GetAdminByCompanyName)
ProviderRouter.get("/GetCompanyDetails",GetCompanyDetailsforProvider)
ProviderRouter.get("/GetAdminDetails",GetAdminDetailsforProvider)

module.exports = ProviderRouter