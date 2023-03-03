import express from "express";
import { check } from "express-validator";

import { fileUpload } from "../middleware/file-upload";
import CheckAuth from "../middleware/check-auth";
import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById,
} from "../controllers/places-controller";

const router = express.Router();

export default router.get("/user/:uId", getPlacesByUserId);

router.get("/:pId", getPlaceById);

router.use(CheckAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
    check("creator").notEmpty(),
  ],
  createPlace
);

router.patch(
  "/:pId",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  updatePlaceById
);

router.delete("/:pId", deletePlaceById);
