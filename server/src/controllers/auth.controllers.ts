import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AuthRequest } from "../types"
import { User } from "../models"
import { asyncHandler, ApiError } from "../utils"
import bcrypt from "bcryptjs"




/* ---------- REGISTER ---------- */

const register = asyncHandler(async (req: Request, res: Response) => {

  const name = req.body.name
  const email = req.body.email
  const password = req.body.password 

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, Email and Password required")
  }

  const emailLower = email.toLowerCase()

  const existUser = await User.findOne({ email: emailLower })

  if (existUser) {
    throw new ApiError(409, "Email already exists")
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email: emailLower,
    password: hashedPassword
  })

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  )

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })

})



/* ---------- LOGIN ---------- */

const login = asyncHandler(async (req: Request, res: Response) => {

   const email = req.body.email
  const password = req.body.password 

  if (!email || !password) {
    throw new ApiError(400, "Email and password required")
  }

  const emailLower = email.toLowerCase()

  const user = await User
    .findOne({ email: emailLower })
    .select("+password")

  if (!user) {
    throw new ApiError(401, "Invalid email or password")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password")
  }

  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  )

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })

})



/* ---------- GET CURRENT USER ---------- */

const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {

  if (!req.user?.id) {
    throw new ApiError(401, "Unauthorized")
  }

  const user = await User
    .findById(req.user.id)
    .select("-password")

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  res.status(200).json({
    success: true,
    user
  })

})

export {
  login,
  register,
  getMe
}