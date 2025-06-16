import { Router } from "express";
import { getNearbyVets } from "../controllers/locationController.js";

const router = Router()


router.route("/nearby-vets").post(getNearbyVets)


export default router