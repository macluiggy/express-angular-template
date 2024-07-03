// src/application/services/AuthService.ts
import { IAuthService } from '../interfaces/IAuthService';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserService } from './UserService';
import createHttpError from 'http-errors';

export class AuthService implements IAuthService {
  constructor( private userService: UserService) {}

  async signUp(
    {
      email,
      password,
      username = email,
      firstName = email.split('@')[0],
    }: {
      email: string;
      password: string;
      username?: string;
      firstName?: string;
    }
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser({ email, password: hashedPassword, username, firstName });
    const accessToken = this.generateToken(user);
    return { user, accessToken };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new createHttpError.NotFound('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new createHttpError.Unauthorized('Invalid password');
    }

    const accesToken = this.generateToken(user);
    const result = { user,  accesToken };
    console.log(result);
    
    return result;
  }

  private generateToken(user: any): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
  }
}
