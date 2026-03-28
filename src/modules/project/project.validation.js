import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";

export const requestProjectValidation = [
  body("workspaceId")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Workspace ID"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Workspace ID")),

  body("name")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Nama"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Nama"))
    .isLength({ min: 4 })
    .withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Nama", 4)),
];
