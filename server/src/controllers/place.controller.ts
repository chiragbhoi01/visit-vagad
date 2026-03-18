import { asyncHandler, ApiError } from "../utils"
import { Request, Response } from "express"
import Place from "../models/place.models"

/* ---------- getAllPlaces ---------- */

export const getAllPlaces = asyncHandler(async (req: Request, res: Response) => {

    const { district, category } = req.query

    // dynamic filter
    const filter: any = {}

    if (district) filter.district = district
    if (category) filter.category = category

    const places = await Place.find(filter)

    res.status(200).json({
        success: true,
        count: places.length,
        data: places
    })
})


/* ---------- getPlaceById ---------- */

export const getPlaceById = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const place = await Place.findById(id)

    if (!place) {
        throw new ApiError(404, "Place not found")
    }

    res.status(200).json({
        success: true,
        data: place
    })
})