import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { FileStaticRequest } from './dto/file-static.request';
import { FileStaticResponse } from './dto/file-static.response';
import fs from 'fs';
import { I18nService } from 'nestjs-i18n';
import { FILE_NAME_ENUM, FILE_NAME_MAP } from '@app/constant/import.constant';
import { ResponseBuilder } from '@app/utils/response-builder';
import { ResponseCodeEnum } from '@app/constant/response-code.enum';
import { getTemplate } from '@app/utils/common';
import { LangCurrent } from '@app/core/decorator/lang.decorator';
import { LANG_ENUM } from '@app/constant/common';
import { DeleteFileReqDto } from './dto/delete-file.request';
import { StaticService } from './static.service';

@Controller('template-import')
export class StaticController {
  constructor(
    private readonly i18n: I18nService,
    private readonly staticService: StaticService,
  ) {}

  @Get('/:fileName')
  public async downloadFile(
    @Param() request: FileStaticRequest,
    @LangCurrent() lang: LANG_ENUM,
  ): Promise<any> {
    const fileStaticResponse = new FileStaticResponse();
    if (!FILE_NAME_ENUM[request.fileName]) {
      return new ResponseBuilder()
        .withCode(ResponseCodeEnum.BAD_REQUEST)
        .withMessage(await this.i18n.translate('error.FILE_NOT_EXIST'))
        .build();
    }
    const fileName = FILE_NAME_MAP[request.fileName];
    fileStaticResponse.data = await Buffer.from(
      fs.readFileSync(`${getTemplate(lang)}${fileName}`, {}),
    );
    return fileStaticResponse;
  }

  @Delete('/archive')
  async deleteArchive(@Body() body: DeleteFileReqDto) {
    return this.staticService.deleteArchiveFile(body);
  }
}
