import Express from 'express'
import { createWorkspaceMember, deleteWorkspaceMember, findAllWorkspaceMember, findWorkspaceMemberById, updateWorkspaceMember } from './workspace_member.controller.js'
import { requestWorkspaceMemberValidation } from './workspace_member.validation.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'

const workspaceMemberRoutes = Express.Router()

workspaceMemberRoutes.get("/", findAllWorkspaceMember)
workspaceMemberRoutes.get("/:id", findWorkspaceMemberById)
workspaceMemberRoutes.post("/", requestWorkspaceMemberValidation, validationMiddleware, createWorkspaceMember)
workspaceMemberRoutes.put("/:id", requestWorkspaceMemberValidation, validationMiddleware, updateWorkspaceMember)
workspaceMemberRoutes.delete("/:id", deleteWorkspaceMember)

export default workspaceMemberRoutes