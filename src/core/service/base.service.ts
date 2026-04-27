import { BaseDocument } from '@app/database/base/document/base.document';
import { BaseRepository } from '@app/database/base/repository/base.repository';
import { AnyBulkWriteOperation, FilterQuery, PipelineStage } from 'mongoose';

export abstract class BaseService<
  E extends BaseDocument,
  R extends BaseRepository<E>,
> {
  protected constructor(protected readonly repository: R) {}

  findOneById(id: string) {
    return this.repository.findOneById(id);
  }

  findOneByCondition(condition: FilterQuery<E>) {
    return this.repository.findOne(condition);
  }

  findAllByCondition(
    condition: FilterQuery<E> = {},
    selectFields: string[] = [],
  ) {
    return this.repository.findAll(condition, selectFields);
  }

  findAllSorted(
    condition: FilterQuery<E> = {},
    sort: Record<string, any> = { createdAt: -1, _id: -1 },
  ) {
    return this.repository.findAllSorted(condition, sort);
  }

  aggregate(pipeline: PipelineStage[]) {
    return this.repository.aggregate(pipeline);
  }

  create(data: Partial<E>) {
    return this.repository.create(data);
  }

  createMany(data: Partial<E>[]) {
    return this.repository.createMany(data);
  }

  update(id: string, data: Partial<E>) {
    return this.repository.findByIdAndUpdate(id, data);
  }

  deleteOne(condition: FilterQuery<E>) {
    return this.repository.deleteOne(condition);
  }

  deleteMany(condition: FilterQuery<E>) {
    return this.repository.deleteMany(condition);
  }

  softDelete(condition: FilterQuery<E>, deletedBy: number | undefined) {
    return this.repository.softDelete(condition, deletedBy as number);
  }

  bulkWrite(operations: AnyBulkWriteOperation<E>[]) {
    return this.repository.bulkWrite(operations);
  }

  updateMany(condition: FilterQuery<E>, data: Partial<E>) {
    return this.repository.updateMany(condition, data);
  }
}
