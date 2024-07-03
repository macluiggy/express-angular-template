// src/server.ts
import express from "express";
import { AppDataSource } from "./infrastructure/database/data-source";
import { UserRepository } from "./infrastructure/repositories/UserRepository";
import { UserService } from "./application/services/UserService";
import { UserController } from "./infrastructure/controllers/UserController";
import { API_VERSION } from "./config/constants";
import userRoutes from "./infrastructure/routes/UserRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    // add a health check route
    app.get("/health", (req, res) => {
      res.send("Server is up and running");
    });

    // add api/v1 prefix to all routes
    app.use(`/api/${API_VERSION}`, userRoutes);

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
