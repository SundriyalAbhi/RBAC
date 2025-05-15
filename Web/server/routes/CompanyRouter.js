const express = require("express")
const { AddCompany, GetAllCompany, GetCompanyByName, UpdateCompanyDetails } = require("../Controllers/CompanyController")

const ComapnyRouter = express.Router()

ComapnyRouter.post("/AddCompany",AddCompany)
ComapnyRouter.get("/GetAllCompany",GetAllCompany)
ComapnyRouter.get("/GetCompanyByName",GetCompanyByName)
ComapnyRouter.put("/UpdateCompanyDetails/:id", UpdateCompanyDetails)



module.exports = ComapnyRouter