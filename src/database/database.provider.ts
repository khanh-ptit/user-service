import { DatabaseService } from './database.service';
import { FileRepository } from '@app/core/components/file/repositories/file.repository';
import { UserRepository } from '../components/user/repository/user.repository';

export const databaseProviders = [
  DatabaseService,
  FileRepository,
  UserRepository,
];
