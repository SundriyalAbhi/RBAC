const express = require("express")
const { AddSystemAnnouncement, GetSystemAnnouncements } = require("../Controllers/SystemAnnouncementsController")


const SystemAnnouncementsRouter = express.Router()

SystemAnnouncementsRouter.post("/AddSystemAnnouncement",AddSystemAnnouncement)
SystemAnnouncementsRouter.get("/GetSystemAnnouncements", GetSystemAnnouncements)
// SystemAnnouncementsRouter.delete("/DeleteSystemAnnouncements",DeleteCompany)



module.exports = SystemAnnouncementsRouter