import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@app/database/base/entity/base.entity';

@Entity('files')
export class File extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  resourceId: string;

  @Column({ type: 'varchar', nullable: false })
  resource: string;

  @Column({ type: 'varchar', nullable: false })
  fileId: string;

  @Column({ type: 'varchar', nullable: true })
  filename: string;
}
