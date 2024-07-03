// src/server.ts
import express from 'express';
import { AppDataSource } from './infrastructure/database/data-source';
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { UserService } from './application/services/UserService';
import { UserController } from './infrastructure/controllers/UserController';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  app.get('/users', (req, res) => userController.getUsers(req, res));
  app.get('/users/:id', (req, res) => userController.getUserById(req, res));
  app.post('/users', (req, res) => userController.createUser(req, res));
  app.put('/users/:id', (req, res) => userController.updateUser(req, res));
  app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => console.log(error));
