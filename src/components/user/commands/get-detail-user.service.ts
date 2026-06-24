import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { BusinessException } from '@app/core/exception-filters/business-exception.filter';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class GetDetailUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
  ) {}

  async execute(id: number) {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new BusinessException(this.i18nService.t('error.NOT_FOUND'));
    }

    const returnData = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    return { data: returnData };
  }
}
