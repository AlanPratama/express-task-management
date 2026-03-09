import express from 'express'
import { updateMyProfileUser } from './user.controller.js'
import { upload } from '../../middlewares/upload.middleware.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const userRoutes = express.Router()

userRoutes.put("/profile", upload.single("photo"), authMiddleware, updateMyProfileUser)

export default userRoutes