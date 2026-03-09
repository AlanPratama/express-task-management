import express from 'express'
import { createWorkspace, deleteWorkspace, findAllWorkspace, findWorkspaceById, updateWorkspace } from './workspace.controller.js'
import { requestWorkspaceValidation } from './workspace.validation.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'

const workspaceRoute = express.Router()

workspaceRoute.get("/", findAllWorkspace)
workspaceRoute.get("/:id", findWorkspaceById)
workspaceRoute.post("/", requestWorkspaceValidation, validationMiddleware, createWorkspace)
workspaceRoute.put("/:id", requestWorkspaceValidation, validationMiddleware, updateWorkspace)
workspaceRoute.delete("/:id", deleteWorkspace)

export default workspaceRoute