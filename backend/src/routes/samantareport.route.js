import { Router } from "express";
import { campaignlist } from "../controllers/samantareport.controller.js"


const router = Router()

router.post("/", campaignlist)

export default router;