import { Router } from "express";
import { getDiagnosis } from "../controllers/diagnosisController.js";

const router= Router()


router.route("/diagnosis").post(getDiagnosis)

export default router