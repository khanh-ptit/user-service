import {
  Repository,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
} from 'typeorm';
import { BaseEntity } from '../entity/base.entity';
import { requestContext } from '@app/core/context/request.context';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  getRepository(): Repository<T> {
    return this.repository;
  }

  async create(data: Partial<T>): Promise<T> {
    const store = requestContext.getStore();
    data.createdBy = store?.userId;
    const entity = this.repository.create(data as any);
    return this.repository.save(entity as any);
  }

  async createMany(data: Partial<T>[]): Promise<T[]> {
    const entities = this.repository.create(data as any);
    return this.repository.save(entities as any);
  }

  async findOne(criteria: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOne({ where: criteria });
  }

  async findOneById(id: any): Promise<T | null> {
    return this.repository.findOne({ where: { id } as any });
  }

  async findAll(criteria: FindOptionsWhere<T> = {}): Promise<T[]> {
    return this.repository.find({ where: criteria });
  }

  async update(id: any, data: Partial<T>): Promise<UpdateResult> {
    return this.repository.update(id, data as any);
  }

  async delete(id: any): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async softDelete(id: any, deletedBy: number): Promise<UpdateResult> {
    await this.repository.update(id, { deletedBy } as any);
    return this.repository.softDelete(id);
  }

  async paginate(
    filter: FindOptionsWhere<T> = {},
    options: {
      page?: number;
      limit?: number;
      sort?: any;
      relations?: string[];
    } = {},
  ) {
    const {
      page = 1,
      limit = 10,
      sort = { createdAt: 'DESC' },
      relations = [],
    } = options;
    const skip = (page - 1) * limit;

    const [docs, total] = await this.repository.findAndCount({
      where: filter,
      order: sort,
      take: limit,
      skip: skip,
      relations: relations,
    });

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
