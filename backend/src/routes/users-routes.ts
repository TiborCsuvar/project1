import express from "express";
import {
  getUsers,
  signupUser,
  loginUser,
} from "../controllers/users-controller";

const router = express.Router();

export default router.get("/", getUsers);

router.post("/signup", signupUser);

router.post("/login", loginUser);
