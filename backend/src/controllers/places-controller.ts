import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import getCoordinatesForAddress from "../util/location";
import { Place } from "../models/place-schema";

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

export const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pId;

  let foundPlace;
  try {
    foundPlace = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Cannot find a place.", 500));
  }

  if (!foundPlace) {
    return next(
      new HttpError("Could not find a place for the provided ID.", 404)
    );
  }
  const response = foundPlace.toObject({ getters: true });

  res.status(200).json(response);
};

export const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uId;

  let foundPlaces;
  try {
    foundPlaces = await Place.find({ creator: userId });
  } catch (error) {
    return next(new HttpError("Request failed, try again later.", 500));
  }

  if (!foundPlaces || foundPlaces.length === 0) {
    return next(
      new HttpError("Could not find places for the provided ID.", 404)
    );
  }
  const response = foundPlaces.map((place) =>
    place.toObject({ getters: true })
  );

  res.status(200).json(response);
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data.", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title: title,
    description: description,
    address: address,
    location: coordinates,
    image: "https://en.wikipedia.org/wiki/File:June_odd-eyed-cat.jpg",
    creator: creator,
  });

  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again.", 500));
  }
  res.status(201).json(createdPlace);
};

export const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data.", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pId;

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not update.", 500));
  }

  updatedPlace.title = title;
  updatedPlace.description = description;

  try {
    await updatedPlace.save();
  } catch (error) {
    return next(new HttpError("Could not update place", 500));
  }

  const response = updatedPlace.toObject({ getters: true });

  res.status(200).json(response);
};

export const deletePlaceById = (req, res) => {
  const placeId = req.params.pId;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: `Deleted place with id: ${placeId}` });
};
