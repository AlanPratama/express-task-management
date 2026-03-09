import express from 'express'
import authRoutes from '../modules/auth/auth.route.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import workspaceRoute from '../modules/workspace/workspace.route.js'

const routes = express.Router()

routes.use("/auth", authMiddleware, authRoutes)
routes.use("/workspaces", authMiddleware, workspaceRoute)

export default routes