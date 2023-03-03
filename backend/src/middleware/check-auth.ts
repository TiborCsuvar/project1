import jwt from "jsonwebtoken";
import config from "../../config";

import HttpError from "../models/http-error";

const TOKEN_KEY = config.token_key;

export default function CheckAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, TOKEN_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authenticatoin failed!", 401));
  }
}
