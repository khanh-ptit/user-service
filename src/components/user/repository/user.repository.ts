import { BaseRepository } from '@app/database/base/repository/base.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from 'src/components/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';

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
}
