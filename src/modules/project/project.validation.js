import { body } from "express-validator";

export const requestProjectValidation = [
  body("name")
  .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Nama"))
  .isString().withMessage(VALIDATION_MESSAGE.STRING("Nama"))
  .isLength({ min: 4 }).withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Nama", 4)),

  body("description")
  .isString().withMessage(VALIDATION_MESSAGE.STRING("Deskripsi"))
  .isLength({ min: 4 }).withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Deskripsi", 4))
]