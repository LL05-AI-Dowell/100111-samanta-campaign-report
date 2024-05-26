import { Router } from "express";
import { campaignlists,userInfo } from "../controllers/samantareport.controller.js"


const router = Router()

router.post("/campaign_list", campaignlists)
router.get("/user_details", userInfo)

export default router;

