import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.logger.log('Initializing MongoDB connection...');

    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected successfully');
    });

    this.connection.on('error', (error) => {
      this.logger.error('❌ MongoDB connection error:', error);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('⚠️ MongoDB disconnected');
    });

    this.connection.on('reconnected', () => {
      this.logger.log('🔄 MongoDB reconnected');
    });

    try {
      if (this.connection.db) {
        await this.connection.db.admin().ping();
        this.logger.log('✅ MongoDB ping successful');
      }
    } catch (error) {
      this.logger.error('❌ MongoDB ping failed:', error);
    }
  }
}
