import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class BaseDocument extends Document<Types.ObjectId> {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({
    required: false,
    default: null,
  })
  deletedAt: Date;

  @Prop({
    required: false,
    type: Number,
  })
  createdBy?: number;

  @Prop({
    required: false,
    type: Number,
  })
  deletedBy?: number;
}
