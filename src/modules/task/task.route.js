import express from "express";
import { requestTaskValidation } from "./task.validation.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import {
  createTask,
  deleteTask,
  findAllTask,
  findTaskById,
  updateTask,
} from "./task.controller.js";

const taskRoutes = express.Router();

taskRoutes.get("/", findAllTask);
taskRoutes.get("/:id", findTaskById);
taskRoutes.post("/", requestTaskValidation, validationMiddleware, createTask);
taskRoutes.put("/:id", requestTaskValidation, validationMiddleware, updateTask);
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;
