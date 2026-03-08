import { body } from "express-validator";
import { VALIDATION_MESSAGE } from "../../shared/constants/validation_message.constant.js";

export const registerValidator = [
    body("name")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Name"))
    .isString().withMessage(VALIDATION_MESSAGE.STRING("Name"))
    .isLength({ min: 3 }).withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Name", 3)),

    body("email")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Email"))
    .isString().withMessage(VALIDATION_MESSAGE.STRING("Email"))
    .isEmail().withMessage(VALIDATION_MESSAGE.EMAIL("Email")),

    body("password")
    .notEmpty().withMessage(VALIDATION_MESSAGE.REQUIRED("Password"))
    .isString().withMessage(VALIDATION_MESSAGE.STRING("Password"))
    .isLength({ min: 4 }).withMessage(VALIDATION_MESSAGE.MIN_LENGTH("Password", 4))

]