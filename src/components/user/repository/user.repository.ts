import { BaseRepository } from '@app/database/base/repository/base.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from 'src/components/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';
import { GetListUserRequestDto } from '../dto/request/get-list-user.request.dto';

export class UserRepository extends BaseRepository<UserEntity> {
  constructor(
    @InjectDataSource()
    dataSource: DataSource,
  ) {
    super(dataSource.getRepository(UserEntity));
  }

  createEntity(request: CreateUserRequestDto) {
    const user = new UserEntity();
    user.name = request.name;
    user.email = request.email;
    user.password = request.password;

    return user;
  }

  async getList(request: GetListUserRequestDto) {
    const query = this.repository.createQueryBuilder('user');

    if (request.keyword) {
      query.andWhere(
        '(user.name ILIKE :keyword OR user.email ILIKE :keyword)',
        { keyword: `%${request.keyword}%` },
      );
    }

    query.skip(request.skip).take(request.take);

    const [docs, total] = await query.getManyAndCount();

    const page = Number(request.page) || 1;
    const limit = request.take;

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
