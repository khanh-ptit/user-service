import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseDocument } from './base.document';

export class FileDocument extends BaseDocument {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  fileId: Types.ObjectId;

  @Prop({
    type: String,
    required: false,
  })
  filename: string;
}
