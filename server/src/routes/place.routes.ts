import { Router } from "express";
import { getAllPlaces, getPlaceById } from "../controllers/place.controller";

const router = Router()

router.get("/", getAllPlaces)
router.get("/:id", getPlaceById)

export default router