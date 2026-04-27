import {
  AnyBulkWriteOperation,
  FilterQuery,
  Model,
  PipelineStage,
  RootFilterQuery,
  SortOrder,
  UpdateQuery,
} from 'mongoose';
import { BulkWriteResult } from 'mongodb';
import { BaseDocument } from '../document/base.document';
import { requestContext } from '@app/core/context/request.context';

export abstract class BaseRepository<T extends BaseDocument> {
  constructor(protected readonly baseModel: Model<T>) {}

  createDocument(data: Partial<T>): T {
    return new this.baseModel(data);
  }

  get find(): Model<T>['find'] {
    return this.baseModel.find.bind(this.baseModel);
  }

  get exists(): Model<T>['exists'] {
    return this.baseModel.exists.bind(this.baseModel);
  }

  getModel(): Model<T> {
    return this.baseModel;
  }

  async create(data: Partial<T>): Promise<T> {
    const store = requestContext.getStore();
    data.createdBy = store?.userId;
    return this.baseModel.create(data);
  }

  async createMany(data: Partial<T>[]): Promise<T[]> {
    return this.baseModel.create(data);
  }

  async bulkWrite(
    operations: AnyBulkWriteOperation<T>[],
  ): Promise<BulkWriteResult> {
    return this.baseModel.bulkWrite(operations as any[]);
  }

  async findOne(criteria: FilterQuery<T>): Promise<T | null> {
    return this.baseModel.findOne(criteria).lean<T>().exec();
  }

  async aggregate(pipeline: PipelineStage[]): Promise<any[]> {
    return this.baseModel.aggregate(pipeline).exec();
  }

  public async findOneWithPopulate(
    condition: FilterQuery<T>,
    populate: any,
  ): Promise<T | null> {
    return await this.baseModel
      .findOne({ ...condition })
      .populate(populate)
      .lean<T>()
      .exec();
  }

  async findOneById(id: string): Promise<T | null> {
    return this.baseModel.findOne({ _id: id }).exec();
  }

  async findAll(
    criteria: FilterQuery<T> = {},
    selectFields: string[] = [],
  ): Promise<T[]> {
    return this.baseModel.find(criteria).select(selectFields?.join(' ')).exec();
  }

  async findAllSorted(
    criteria: FilterQuery<T> = {},
    sort: Record<string, SortOrder>,
  ): Promise<T[]> {
    return this.baseModel.find(criteria).sort(sort).exec();
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return this.baseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteOne(
    criteria: RootFilterQuery<T>,
  ): Promise<{ deletedCount?: number }> {
    return this.baseModel.deleteOne(criteria).exec();
  }

  async deleteMany(
    criteria: RootFilterQuery<T>,
  ): Promise<{ deletedCount?: number }> {
    return this.baseModel.deleteMany(criteria).exec();
  }

  async updateMany(
    criteria: RootFilterQuery<T>,
    data: UpdateQuery<T>,
  ): Promise<{ modifiedCount?: number }> {
    const result = await this.baseModel.updateMany(criteria, data).exec();
    return { modifiedCount: result.modifiedCount };
  }

  async softDelete(
    criteria: RootFilterQuery<T>,
    deletedBy: number,
  ): Promise<{ modifiedCount?: number }> {
    const result = await this.baseModel
      .updateMany(criteria, {
        $set: {
          deletedAt: new Date(),
          deletedBy: deletedBy,
        },
      })
      .exec();
    return { modifiedCount: result.modifiedCount };
  }

  async paginate(
    filter: FilterQuery<T> = {},
    options: {
      page?: number;
      limit?: number;
      sort?: Record<string, SortOrder>;
      populate?: any;
      isGetAll?: boolean;
    } = {},
  ) {
    const {
      page = 1,
      limit = 10,
      sort = { createdAt: -1 },
      populate = null,
      isGetAll = false,
    } = options;

    const skip = (page - 1) * limit;

    if (isGetAll) {
      const docs = await this.baseModel
        .find(filter)
        .sort(sort)
        .populate(populate || [])
        .lean<T[]>()
        .exec();
      const total = docs.length;
      return {
        docs,
        meta: {
          total,
          page: 1,
          limit: total,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const [docs, total] = await Promise.all([
      this.baseModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populate || [])
        .lean<T[]>()
        .exec(),
      this.baseModel.countDocuments(filter),
    ]);

    return {
      docs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }
}
