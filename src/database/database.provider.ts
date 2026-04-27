import { DatabaseService } from './database.service';
import { FileRepository } from '@app/core/components/file/repositories/file.repository';

export const databaseProviders = [DatabaseService, FileRepository];
