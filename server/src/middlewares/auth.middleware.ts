import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import { asyncHandler, ApiError } from "../utils"
import { User } from "../models/user.models"
import { config } from "../config/config"



/* ---------- EXTEND EXPRESS REQUEST ---------- */

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                role: "user" | "admin"
            }
        }
    }
}



/* ---------- AUTHENTICATION MIDDLEWARE ---------- */

export const protect = asyncHandler(
    async (req: Request, _: Response, next: NextFunction) => {

        let token: string | undefined

        /* Step 1: Get token from Authorization header */

        const authHeader = req.headers.authorization

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1]
        }

        if (!token) {
            throw new ApiError(401, "Authorization token required")
        }


        /* Step 2: Verify token */

        const decoded = jwt.verify(
            token,
            config.jwtSecret as string
        ) as JwtPayload


        if (!decoded?.id) {
            throw new ApiError(401, "Invalid token")
        }


        /* Step 3: Find user */

        const user = await User
            .findById(decoded.id)
            .select("-password")

        if (!user) {
            throw new ApiError(401, "User not found")
        }


        /* Step 4: Attach user to request */

        req.user = {
            id: user._id.toString(),
            role: user.role
        }

        next()
    }
)



/* ---------- ROLE AUTHORIZATION ---------- */

export const authorize = (...roles: ("user" | "admin")[]) => {
    return (req: Request, _: Response, next: NextFunction) => {

        if (!req.user) {
            throw new ApiError(401, "Unauthorized")
        }

        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "Forbidden: insufficient permissions")
        }

        next()
    }
}