import { v4 as uuidv4 } from "uuid";

import HttpError from "../models/http-error";

const DUMMY_PLACES: any = [
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

export const getPlaceByUserId = (req, res) => {
  const placeId = req.params.pId;
  const response = DUMMY_PLACES.find((place) => {
    return place.id === placeId;
  });
  if (!response) {
    throw new HttpError("Could not find a place for the provided ID.", 404);
  }

  res.status(200).json(response);
};

export const createPlace = (req, res) => {
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
