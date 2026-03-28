import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";

export const requestTaskAttachmentValidation = [
  body("taskId").notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Task ID")),
];
