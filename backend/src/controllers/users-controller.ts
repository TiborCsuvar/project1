import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";

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

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("E-mail address and/or password are wrong.", 401);
  }

  res.json({ message: "Logged in." });
};

export const signupUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs, check your data", 422);
  }

  const { name, email, password } = req.body;

  const haUser = DUMMY_USERS.find((u) => u.email === email);
  if (haUser) {
    throw new HttpError("E-mail address is already exist.", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json(createdUser);
};
