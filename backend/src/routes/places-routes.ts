import express from "express";

import {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById,
} from "../controllers/places-controller";

const router = express.Router();

export default router.get("/user/:uId", getPlaceById);

router.get("/:pId", getPlaceByUserId);

router.post("/", createPlace);

router.patch("/:pId", updatePlaceById);

router.delete("/:pId", deletePlaceById);
