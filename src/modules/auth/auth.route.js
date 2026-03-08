import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { getMe, login, register } from './auth.controller.js'
import { adminMiddleware } from '../../middlewares/admin.middleware.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'
import { registerValidator } from './auth.validator.js'

const authRoutes = express.Router()

authRoutes.post("/register", registerValidator, validationMiddleware, register)
authRoutes.post("/login", login)
authRoutes.get("/me", [authMiddleware, adminMiddleware], getMe)

export default authRoutes