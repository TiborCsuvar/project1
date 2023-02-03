import express from "express";

import {
  getPlaceById,
  getPlaceByUserId,
} from "../controllers/places-controller";

const router = express.Router();

export default router.get("/user/:uId", getPlaceById);

router.get("/:pId", getPlaceByUserId);
