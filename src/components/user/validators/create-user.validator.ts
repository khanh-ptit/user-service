import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';
import { UserRepository } from '../repository/user.repository';
import { isEmpty } from 'lodash';
import { BusinessException } from '@app/core/exception-filters/business-exception.filter';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CreateUserValidator {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
  ) {}

  async validate(body: CreateUserRequestDto) {
    const existUser = await this.userRepository.findOne({ email: body.email });

    if (!isEmpty(existUser)) {
      throw new BusinessException(
        this.i18nService.translate('error.USER_EXISTED'),
      );
    }
  }
}
