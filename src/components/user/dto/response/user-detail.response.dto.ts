import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { DepartmentSettingResponseDto } from './department.response.dto';

class WarehouseResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({ name: 'id' })
  @Expose()
  warehouseId: number;

  @ApiProperty()
  @Expose()
  factoryId: number;

  @ApiProperty()
  @Expose()
  factoryName: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  code: string;
}

class UserPermission {
  @ApiProperty()
  @Expose()
  code: string;
}

class UserResponse {
  @ApiProperty({ example: 1, description: '' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'admin', description: '' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'admin', description: '' })
  @Expose()
  fullName: string;
}

class GetListUserRoleResponseDto {
  @Expose()
  id: number;

  @Expose()
  userRoleId: number;

  @Expose()
  departmentId: number;
}

class Company {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;
}

export class OrganizationNodeResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  level?: number;

  @ApiProperty()
  @Expose()
  status?: number;

  @ApiProperty()
  @Transform(({ obj }) => obj?.nameVn || obj?.vnName || obj?.name)
  @Expose()
  nameVn: string;

  @ApiProperty()
  @Transform(({ obj }) => obj?.nameEn || obj?.enName || obj?.name)
  @Expose()
  nameEn?: string;

  @ApiProperty()
  @Expose()
  mPath?: string;

  @ApiProperty()
  @Expose()
  rootId?: number;

  @ApiProperty()
  @Expose()
  parentId?: number;

  @ApiProperty()
  @Expose()
  departmentId?: number;
}

export class UserAssignmentResDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  mPath: string;

  @ApiProperty()
  @Expose()
  departmentId: number;

  @ApiProperty()
  @Expose()
  organizationIds: number[];

  @ApiProperty()
  @Expose()
  @Type(() => OrganizationNodeResponseDto)
  organizations: OrganizationNodeResponseDto[];
}

export class UserDetailResponseDto {
  @ApiProperty({ example: 1, description: '' })
  @Expose()
  id: number;

  @ApiProperty({ example: 'abc@gmail.com', description: '' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'abc', description: '' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'abc', description: '' })
  @Expose()
  fullName: string;

  @ApiProperty({ example: 1, description: '' })
  @Expose()
  companyId: string;

  @ApiProperty({ type: Company, description: '' })
  @Expose()
  @Type(() => Company)
  company: Company;

  @ApiProperty({ example: '1970-01-01T00:00:00.000Z', description: '' })
  @Transform((v) => {
    if (v.value) {
      return new Date(v.value).toISOString();
    }
    return null;
  })
  @Expose()
  dateOfBirth: string;

  @ApiProperty({ example: 'abc', description: '' })
  @Expose()
  code: string;

  @ApiProperty({ example: '0987-1254-125', description: '' })
  @Expose()
  phone: string;

  @ApiProperty({ example: 1, description: '' })
  @Expose()
  status: number;

  @ApiProperty({ example: true, description: '' })
  @Expose()
  statusNotification: boolean;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @ApiProperty({ example: true })
  @Expose()
  costCenterIds: string;

  @ApiProperty({ type: UserResponse })
  @Expose()
  @Type(() => UserResponse)
  createdBy: UserResponse;

  @ApiProperty({ type: UserResponse })
  @Expose()
  @Type(() => UserResponse)
  updatedBy: UserResponse;

  @ApiProperty({
    type: WarehouseResponse,
    example: [{ id: 1, name: 'warehouse 1' }],
    description: '',
  })
  @Expose()
  @Type(() => WarehouseResponse)
  userWarehouses: WarehouseResponse[];

  @ApiProperty({
    type: GetListUserRoleResponseDto,
    example: [{ id: 1, name: 'role 1' }],
    description: '',
  })
  @Expose()
  @Type(() => GetListUserRoleResponseDto)
  userRoles: GetListUserRoleResponseDto[];

  @ApiProperty({
    type: DepartmentSettingResponseDto,
    example: [{ id: 1, name: 'department 1' }],
    description: '',
  })
  @Expose()
  @Type(() => DepartmentSettingResponseDto)
  departmentSettings: DepartmentSettingResponseDto[];

  @ApiProperty()
  @Expose()
  factoryIds: number[];

  @ApiProperty({
    type: UserPermission,
  })
  @Expose()
  @Type(() => UserPermission)
  userPermissions: UserPermission[];

  @ApiProperty()
  @Expose()
  @Type(() => UserAssignmentResDto)
  userAssignments: UserAssignmentResDto[];
}
