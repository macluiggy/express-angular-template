// src/server.ts
import express from "express";
import { AppDataSource } from "./infrastructure/database/data-source";
import { API_VERSION } from "./config/constants";
import userRoutes from "./infrastructure/routes/UserRoutes";
import authRoutes from "./infrastructure/routes/AuthRoutes";
import { errorHandler } from "./infrastructure/middleware/errorHandler";
import { responseHandler } from "./infrastructure/middleware/responseHandler";

const app = express();
app.use(express.json());
app.use(responseHandler);
AppDataSource.initialize()
  .then(() => {
    // add a health check route
    app.get("/health", (req, res) => {
      res.send("Server is up and running");
    });

    // add api/v1 prefix to all routes
    app.use(`/api/${API_VERSION}`, userRoutes);
    app.use(`/api/${API_VERSION}`, authRoutes);
    app.use(errorHandler);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
