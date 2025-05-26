const express = require("express")
const { AddCompany, GetAllCompany, GetCompanyByName, UpdateCompanyDetails, DeleteCompany, getAllAdminsforProvider} = require("../Controllers/CompanyController")

const ComapnyRouter = express.Router()

ComapnyRouter.post("/AddCompany",AddCompany)
ComapnyRouter.get("/GetAllCompany",GetAllCompany)
ComapnyRouter.get("/GetCompanyByName",GetCompanyByName)
ComapnyRouter.put("/UpdateCompanyDetails/:id", UpdateCompanyDetails)
ComapnyRouter.delete("/DeleteCompany",DeleteCompany)
ComapnyRouter.get("/AllAdmins",getAllAdminsforProvider)



module.exports = ComapnyRouter