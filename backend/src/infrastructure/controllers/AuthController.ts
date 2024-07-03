// src/infrastructure/controllers/AuthController.ts
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.authService.signUp({ email, password });
      res.success({
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.success({
        message: "User logged in successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
