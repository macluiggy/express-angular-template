// src/infrastructure/controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/UserService";
import createError from "http-errors";

export class UserController {
  constructor(private userService: UserService) {}

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.success(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await this.userService.getUserById(id);
      if (user) {
        res.success(user);
      } else {
        throw new createError.NotFound("User not found");
      }
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      const newUser = await this.userService.createUser(user);
      res.success(newUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = req.body;
      const updatedUser = await this.userService.updateUser(id, user);
      if (updatedUser) {
        res.success(updatedUser);
      } else {
        res.error({ statusCode: 404, message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      await this.userService.deleteUser(id);
      res.success({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
