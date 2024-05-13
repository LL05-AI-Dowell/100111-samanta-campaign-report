import { Router } from "express";
import {getData, insertData} from "../controllers/example.controller.js";


const router = Router()

router.get("/fetch-data/:limit/:offset", getData)
router.post("/insert-data", insertData)

export default router;

