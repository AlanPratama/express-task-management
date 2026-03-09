import express from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'
import { getMe, login, register } from './auth.controller.js'
import { loginValidator, registerValidator } from './auth.validator.js'

const authRoutes = express.Router()

authRoutes.post("/register", registerValidator, validationMiddleware, register)
authRoutes.post("/login", loginValidator, validationMiddleware, login)
authRoutes.get("/me", authMiddleware, getMe)

export default authRoutes