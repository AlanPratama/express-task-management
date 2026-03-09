import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant";

export const updateProfile = [
  body("name")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Nama"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Nama"))
    .isLength({ min: 3 })
    .withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Nama", 3)),
    
  body("email")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Email"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Email"))
    .isEmail()
    .withMessage(VALIDATION_MESSAGE.EMAIL("Email")),
    
  body("password")
    .notEmpty()
    .withMessage(VALIDATION_MESSAGE.REQUIRED("Password"))
    .isString()
    .withMessage(VALIDATION_MESSAGE.STRING("Password"))
    .isLength({ min: 4 })
    .withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Password", 4)),
];
