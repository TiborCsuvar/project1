import express from "express";
import config from "../config";

import placesRoutes from "./routes/places-routes";

const app = express();

app.use(express.json());

const PORT = config.port || 8081;

app.use("/api/places", placesRoutes);

app.use((error: any, req: any, res: any, next: any) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});

export default app;
