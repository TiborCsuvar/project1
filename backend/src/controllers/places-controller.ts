import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../models/http-error";
import getCoordinatesForAddress from "../util/location";
import { Place } from "../models/place-schema";
import { User } from "../models/user-schema";

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

  let user;

  try {
    user = await User.findById(creator);
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again.", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided ID.", 404));
  }

  try {
    const createPlaceSession = await mongoose.startSession();
    createPlaceSession.startTransaction();
    await createdPlace.save({ session: createPlaceSession });
    user.places.push(createdPlace);
    await user.save({ session: createPlaceSession });
    await createPlaceSession.commitTransaction();
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

export const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pId;

  let deletedPlace;

  try {
    deletedPlace = await Place.findById(placeId);
  } catch (error) {
    return next(new HttpError("Could not delete place", 500));
  }

  try {
    await deletedPlace.remove();
  } catch (error) {
    return next(new HttpError("Could not delete place", 500));
  }

  res.status(200).json({ message: `Deleted place with id: ${placeId}` });
};
