import { BaseRepository } from '@app/database/base/repository/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileRepository extends BaseRepository<File> {
  constructor(
    @InjectRepository(File)
    protected readonly fileRepository: Repository<File>,
  ) {
    super(fileRepository);
  }
}
