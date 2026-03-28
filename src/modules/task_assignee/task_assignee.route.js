import express from "express";
import {
  createTaskAssignee,
  deleteTaskAssigneeById,
  findAllTaskAssigneePagination,
  findTaskAssigneeById,
  updateTaskAssignee,
} from "./task_assignee.controller.js";
import { requestTaskAssigneeValidation } from "./task_assignee.validation.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

const taskAssigneeRoutes = express.Router();

taskAssigneeRoutes.get("/", findAllTaskAssigneePagination);
taskAssigneeRoutes.get("/:id", findTaskAssigneeById);
taskAssigneeRoutes.post(
  "/",
  requestTaskAssigneeValidation,
  validationMiddleware,
  createTaskAssignee,
);
taskAssigneeRoutes.put(
  "/:id",
  requestTaskAssigneeValidation,
  validationMiddleware,
  updateTaskAssignee,
);
taskAssigneeRoutes.delete("/:id", deleteTaskAssigneeById);

export default taskAssigneeRoutes;
