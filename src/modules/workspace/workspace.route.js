import express from 'express'
import { createWorkspace, deleteWorkspace, findAllWorkspace, findWorkspaceById, updateWorkspace } from './workspace.controller.js'
import { requestWorkspaceValidation } from './workspace.validation.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'

const workspaceRoutes = express.Router()

workspaceRoutes.get("/", findAllWorkspace)
workspaceRoutes.get("/:id", findWorkspaceById)
workspaceRoutes.post("/", requestWorkspaceValidation, validationMiddleware, createWorkspace)
workspaceRoutes.put("/:id", requestWorkspaceValidation, validationMiddleware, updateWorkspace)
workspaceRoutes.delete("/:id", deleteWorkspace)

export default workspaceRoutes