// src/infrastructure/database/data-source.ts
import { DataSource } from 'typeorm';
import { UserEntity } from '../../domain/entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase',
  synchronize: false, // Debes tener esto en false en producción
  logging: false,
  entities: [UserEntity],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
});
