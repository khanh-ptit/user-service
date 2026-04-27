import { BaseDocument } from '@app/database/base/document/base.document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type FileDocument = File & BaseDocument;

@Schema({ timestamps: true, collection: 'files' })
export class File extends BaseDocument {
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  resourceId: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  resource: string;

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

export const FileSchema = SchemaFactory.createForClass(File);
