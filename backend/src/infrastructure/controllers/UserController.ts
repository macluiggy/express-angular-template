// src/infrastructure/controllers/UserController.ts
import { Request, Response } from 'express';
import { IUserService } from '../../application/interfaces/IUserService';

export class UserController {
  constructor(private userService: IUserService) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const user = await this.userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const user = req.body;
    const newUser = await this.userService.createUser(user);
    res.status(201).json(newUser);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const user = req.body;
    const updatedUser = await this.userService.updateUser(id, user);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    await this.userService.deleteUser(id);
    res.status(204).send();
  }
}
