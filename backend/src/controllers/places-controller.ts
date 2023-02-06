import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";

let DUMMY_PLACES: any = [
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

export const getPlaceById = (req, res) => {
  const userId = req.params.uId;
  const response = DUMMY_PLACES.find((user) => {
    return user.creator === userId;
  });
  if (!response) {
    throw new HttpError("Could not find an user for the provided ID.", 404);
  }

  res.status(200).json(response);
};

export const getPlacesByUserId = (req, res) => {
  const placeId = req.params.pId;
  const places = DUMMY_PLACES.filter((place) => {
    return place.id === placeId;
  });
  if (places.length === 0) {
    throw new HttpError("Could not find places for the provided ID.", 404);
  }

  res.status(200).json(places);
};

export const createPlace = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs, please check your data.", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title: title,
    description: description,
    location: coordinates,
    address: address,
    creator: creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json(createdPlace);
};

export const updatePlaceById = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs, please check your data.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pId;

  const updatedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json(updatedPlace);
};

export const deletePlaceById = (req, res) => {
  const placeId = req.params.pId;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: `Deleted place with id: ${placeId}` });
};
