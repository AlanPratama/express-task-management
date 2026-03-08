import express from 'express'
import authRoutes from '../modules/auth/auth.route.js'

const routes = express.Router()

routes.use("/auth", authRoutes)

export default routes