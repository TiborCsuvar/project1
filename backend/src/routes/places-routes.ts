import express from "express";
import { check } from "express-validator";

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById,
} from "../controllers/places-controller";

const router = express.Router();

export default router.get("/user/:uId", getPlaceById);

router.get("/:pId", getPlacesByUserId);

router.post(
  "/",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
    check("creator").notEmpty(),
  ],
  createPlace
);

router.patch("/:pId", updatePlaceById);

router.delete("/:pId", deletePlaceById);
