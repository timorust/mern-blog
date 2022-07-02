import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email format error").isEmail(),
  body("password", "The password can not be less than 5 characters").isLength({
    min: 5,
  }),
];
export const registerValidation = [
  body("email", "Email format error").isEmail(),
  body("password", "The password can not be less than 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Please define your name").isLength({ min: 3 }),
  body("avatarUrl", "Wrong link").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Add Title").isLength({ min: 3 }).isString(),
  body("text", "Add Text").isLength({ min: 3 }).isString(),
  body("tags", "Wrong tags").optional().isString(),
  body("imageUrl", "Wrong link").optional().isString(),
];
