import { BaseEntity } from '@app/database/base/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
