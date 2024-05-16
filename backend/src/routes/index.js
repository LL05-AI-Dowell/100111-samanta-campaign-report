import { Router } from "express";
import healtcheckRoutes from './healthcheck.route.js'
import samantareportRoutes from './samantareport.route.js'
 
const router = Router()


router.use("/healtcheckup", healtcheckRoutes)
router.use("/samanta-report", samantareportRoutes)


export default router