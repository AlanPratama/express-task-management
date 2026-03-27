import Express from 'express'
import { createProject, deleteProject, findAllProject, findProjectById, updateProject } from './project.controller'
import { validationMiddleware } from '../../middlewares/validation.middleware'
import { requestProjectValidation } from './project.validation'

const projectRoutes = Express.Router()

projectRoutes.get("/", findAllProject)
projectRoutes.get("/:id", findProjectById)
projectRoutes.post("/", requestProjectValidation, validationMiddleware, createProject)
projectRoutes.put("/:id", requestProjectValidation, validationMiddleware, updateProject)
projectRoutes.delete("/:id", deleteProject)

export default projectRoutes