import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import { User } from "../models/user-schema";

let DUMMY_USERS: any = [
  {
    id: "u1",
    name: "Test",
    password: "test",
    email: "test@test.com",
  },
];

export const getUsers = (req, res) => {
  const allUsers = DUMMY_USERS.map((user) => {
    return user;
  });
  if (!allUsers || allUsers.length === 0) {
    throw new HttpError("Could not find any user.", 404);
  }

  res.status(200).json(allUsers);
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Logging in failed. Try again.", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Invalid credentials.", 401));
  }

  res.json({ message: "Logged in." });
};

export const signupUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check your data", 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Signing up failed. Try again.", 500));
  }

  if (existingUser) {
    return next(new HttpError("User already exist.", 422));
  }

  const createdUser = new User({
    name: name,
    email: email,
    password: password,
    image: "https://en.wikipedia.org/wiki/File:June_odd-eyed-cat.jpg",
    places: places,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Signing up failed.", 500));
  }

  const response = createdUser.toObject({ getters: true });
  res.status(201).json(response);
};
