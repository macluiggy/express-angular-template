// src/infrastructure/routes/userRoutes.ts
import { Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../../application/services/UserService';
import { UserController } from '../controllers/UserController';

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/users', (req, res, next) => userController.getUsers(req, res));
router.get('/users/:id', (req, res, next) => userController.getUserById(req, res));
router.post('/users', (req, res, next) => userController.createUser(req, res));
router.put('/users/:id', (req, res, next) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res, next) => userController.deleteUser(req, res));

export default router;
