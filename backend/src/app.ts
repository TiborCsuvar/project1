import express from "express";
import config from "../config";
import mongoose from "mongoose";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import HttpError from "./models/http-error";

const app = express();

app.use(express.json());

const PORT = config.port || 8081;
const DATABASE_USERNAME = config.database_username;
const DATABASE_PASSWORD = config.database_password;

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

mongoose
  .connect(
    `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@cluster0.hta28o9.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

export default app;
