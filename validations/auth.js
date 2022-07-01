import { body } from "express-validator";

export const registerValidation = [
  body("email", "Email format error").isEmail(),
  body("password", "The password can not be less than 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Please define your name").isLength({ min: 3 }),
  body("avatarUrl", "Wrong link").optional().isURL(),
];
