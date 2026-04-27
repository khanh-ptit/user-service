import { BaseRepository } from '@app/database/base/repository/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from '../entities/file.entity';

@Injectable()
export class FileRepository extends BaseRepository<File> {
  constructor(
    @InjectModel(File.name)
    protected fileModel: Model<File>,
  ) {
    super(fileModel);
  }
}
