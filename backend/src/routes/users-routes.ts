import express from "express";
import {
  getUsers,
  signupUser,
  loginUser,
} from "../controllers/users-controller";
import { check } from "express-validator/src/middlewares/validation-chain-builders";

const router = express.Router();

export default router.get("/", getUsers);

router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signupUser
);

router.post("/login", loginUser);
