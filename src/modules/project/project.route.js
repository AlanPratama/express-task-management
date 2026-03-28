import express from 'express'
import { createProject, deleteProject, findAllProject, findProjectById, updateProject } from './project.controller.js'
import { validationMiddleware } from '../../middlewares/validation.middleware.js'
import { requestProjectValidation } from './project.validation.js'

const projectRoutes = express.Router()

projectRoutes.get("/", findAllProject)
projectRoutes.get("/:id", findProjectById)
projectRoutes.post("/", requestProjectValidation, validationMiddleware, createProject)
projectRoutes.put("/:id", requestProjectValidation, validationMiddleware, updateProject)
projectRoutes.delete("/:id", deleteProject)

export default projectRoutes