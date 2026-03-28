import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";
import { generateError } from "../../shared/utils/error.js";
import { HTTP_STATUS } from "../../shared/constants/http.constant.js";
import { TaskConstant } from "./task.constant.js";

export const requestTaskValidation = [
  body("projectId")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Project ID"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Project ID")),

  body("ownerId")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Owner ID"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Owner ID")),

  body("title")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Judul"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Judul"))
    .isLength({ min: 4 })
    .withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Judul", 4)),

  body("status")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Status"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Status"))
    .isIn(TaskConstant.TASK_STATUS)
    .withMessage(
      `Status harus salah satu dari: ${TaskConstant.TASK_STATUS.join(", ")}`,
    ),

  body("priority")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Prioritas"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Prioritas"))
    .isIn(TaskConstant.TASK_PRIORITY)
    .withMessage(
      `Prioritas harus salah satu dari: ${TaskConstant.TASK_PRIORITY.join(", ")}`,
    ),

  body("dueDate")
    .isISO8601()
    .custom((value) => {
      const inputDate = new Date(value);
      const now = new Date();
      if (inputDate < now) {
        throw generateError(
          HTTP_STATUS.BAD_REQUEST,
          "Tanggal tidak boleh di masa lalu",
        );
      }
      return true;
    })
    .toDate(),
];
