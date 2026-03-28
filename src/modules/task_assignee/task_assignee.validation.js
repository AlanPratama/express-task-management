import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";

export const requestTaskAssigneeValidation = [
  body("taskId").notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Task ID")),

  body("assignedUserId")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Assigned User ID")),
];
