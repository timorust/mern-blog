import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { PostController, UserController } from "./controllers/index.js";
import { checkAuth, handleValidationError } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://mernblog:mern@mernblog.lt9r4.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch(err => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.post(
  "/auth/login",
  loginValidation,
  handleValidationError,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationError,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.post(
  "/posts",
  checkAuth,
  handleValidationError,
  postCreateValidation,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.get("/posts/:id", PostController.getOne);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationError,
  postCreateValidation,
  PostController.update
);

app.listen(4444, err => {
  if (err) {
    console.log(err);
  }
  console.log("Server Ok");
});
