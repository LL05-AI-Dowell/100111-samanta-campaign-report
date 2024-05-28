import { Router } from "express";
import { campaignlists,userInfo, linksReportForCampaign } from "../controllers/samantareport.controller.js"


const router = Router()

router.post("/campaign-list", campaignlists)
router.get("/user-details", userInfo)
router.post("/links-report", linksReportForCampaign)

export default router;

