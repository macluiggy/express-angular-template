// src/application/services/UserService.ts
import { IUserService } from '../interfaces/IUserService';
import { UserEntity } from '../../domain/entities/User';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findById(id);
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
