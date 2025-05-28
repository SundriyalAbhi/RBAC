const express = require("express")
const { AddCompany, GetAllCompany, GetCompanyByName, UpdateCompanyDetails, DeleteCompany, GetCompanyDetails} = require("../Controllers/CompanyController")

const ComapnyRouter = express.Router()

ComapnyRouter.post("/AddCompany",AddCompany)
ComapnyRouter.put("/UpdateCompanyDetails/:id", UpdateCompanyDetails)
ComapnyRouter.delete("/DeleteCompany",DeleteCompany)



module.exports = ComapnyRouter