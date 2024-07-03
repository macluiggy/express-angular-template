// src/infrastructure/routes/userRoutes.ts
import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../../application/services/UserService";
import { UserController } from "../controllers/UserController";
import passport from "../middleware/passport";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.getUsers(req, res, next)
);
router.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => userController.getUserById(req, res, next)
);
router.post("/users", (req, res, next) =>
  userController.createUser(req, res, next)
);
router.put("/users/:id", (req, res, next) =>
  userController.updateUser(req, res, next)
);
router.delete("/users/:id", (req, res, next) =>
  userController.deleteUser(req, res, next)
);

export default router;
