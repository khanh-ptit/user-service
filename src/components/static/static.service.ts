import { Injectable } from '@nestjs/common';
import { DeleteFileReqDto } from './dto/delete-file.request';
import * as fs from 'fs/promises';
import * as path from 'path';
import { DATA_DIR } from '@app/main';
import { I18nService } from 'nestjs-i18n';
import { BusinessException } from '@app/core/exception-filters/business-exception.filter';

@Injectable()
export class StaticService {
  constructor(private readonly i18n: I18nService) {}

  async deleteArchiveFile(req: DeleteFileReqDto) {
    const { filename } = req;

    const safeFilename = path.basename(filename);
    const filePath = path.join(
      DATA_DIR,
      'archive',
      'purchased-request',
      safeFilename,
    );

    try {
      // check tồn tại
      await fs.access(filePath);

      // xoá file
      await fs.unlink(filePath);

      return { message: this.i18n.translate('message.SUCCESS') };
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new BusinessException(
          this.i18n.translate('error.FILE_NOT_EXIST'),
        );
      }

      throw new BusinessException(
        this.i18n.translate('error.INTERNAL_SERVER_ERROR'),
      );
    }
  }
}
