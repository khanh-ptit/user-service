import { BaseEntity } from '@app/database/base/entity/base.entity';
import { BaseRepository } from '@app/database/base/repository/base.repository';

export abstract class BaseService<
  E extends BaseEntity,
  R extends BaseRepository<E>,
> {
  protected constructor(protected readonly repository: R) {}

  findOneById(id: any) {
    return this.repository.findOneById(id);
  }

  findOneByCondition(condition: any) {
    return this.repository.findOne(condition);
  }

  findAllByCondition(condition: any = {}) {
    return this.repository.findAll(condition);
  }

  create(data: Partial<E>) {
    return this.repository.create(data);
  }

  createMany(data: Partial<E>[]) {
    return this.repository.createMany(data);
  }

  update(id: any, data: Partial<E>) {
    return this.repository.update(id, data);
  }

  delete(id: any) {
    return this.repository.delete(id);
  }

  softDelete(id: any, deletedBy: number | undefined) {
    return this.repository.softDelete(id, deletedBy as number);
  }

  paginate(filter: any = {}, options: any = {}) {
    return this.repository.paginate(filter, options);
  }
}
