import express from "express";

import HttpError from "../models/http-error";

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Halászbástya",
    description: "A fortress from the XIX. century.",
    imageUrl: "/halaszbastya.jfif",
    address: "Budapest, Szentháromság tér, 1014",
    creator: "u1",
    location: {
      lat: 47.5021827,
      lng: 19.0325925,
    },
  },
];

export default router.get("/user/:uId", (req, res) => {
  const userId = req.params.uId;
  const response = DUMMY_PLACES.find((user) => {
    return user.creator === userId;
  });
  if (!response) {
    throw new HttpError("Could not find an user for the provided ID.", 404);
  }

  res.status(200).json(response);
});

router.get("/:pId", (req, res) => {
  const placeId = req.params.pId;
  const response = DUMMY_PLACES.find((place) => {
    return place.id === placeId;
  });
  if (!response) {
    throw new HttpError("Could not find a place for the provided ID.", 404);
  }

  res.status(200).json(response);
});
