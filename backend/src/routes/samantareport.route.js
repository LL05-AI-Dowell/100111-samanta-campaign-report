import { Router } from "express";
import { campaignlists } from "../controllers/samantareport.controller.js"


const router = Router()

router.post("/", campaignlists)

export default router;

