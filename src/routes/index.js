import express from 'express'
import authRoutes from '../modules/auth/auth.route.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import workspaceRoutes from '../modules/workspace/workspace.route.js'
import userRoutes from '../modules/user/user.route.js'
import workspaceMemberRoutes from '../modules/workspace_member/workspace_member.route.js'
import projectRoutes from '../modules/project/project.route.js'

const routes = express.Router()

routes.use("/auth", authMiddleware, authRoutes)
routes.use("/users", authMiddleware, userRoutes)
routes.use("/workspaces", authMiddleware, workspaceRoutes)
routes.use("/workspace-members", authMiddleware, workspaceMemberRoutes)
routes.use("/projects", authMiddleware, projectRoutes)

export default routes