import { body } from "express-validator";

export const registerValidation = [
  body("username").isLength({ min: 3 }).withMessage("username must be at least 3 chars"),
  body("email").isEmail().withMessage("valid email required"),
  body("password").isLength({ min: 6 }).withMessage("password min 6 chars")
];

export const loginValidation = [
  body("email").isEmail().withMessage("valid email required"),
  body("password").notEmpty().withMessage("password required")
];