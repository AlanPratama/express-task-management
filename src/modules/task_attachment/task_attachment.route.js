import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import {
    createTaskAttachment,
    deleteTaskAttachmentById,
    findAllTaskAttachments,
    findTaskAttachmentById,
} from "./task_attachment.controller.js";

const taskAttachmentRoutes = express.Router();

taskAttachmentRoutes.get("/", findAllTaskAttachments);
taskAttachmentRoutes.get("/:id", findTaskAttachmentById);
taskAttachmentRoutes.post(
  "/",
  upload.single("file"),
  authMiddleware,
  createTaskAttachment,
);
taskAttachmentRoutes.delete("/:id", deleteTaskAttachmentById);

export default taskAttachmentRoutes;
