import { APIPrefix } from '@app/common/common';
import { ConfigService } from '@app/config/config.service';
import { ResponseCodeEnum } from '@app/constant/response-code.enum';
import { ResponseBuilder } from '@app/utils/response-builder';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';
import { isEmpty } from 'lodash';
import { I18nService } from 'nestjs-i18n';
import { HttpClientService } from '../http-client/http-client.service';
import { UPLOAD_FILE_ENPOINT } from './file.constant';
import { FileRepository } from './repositories/file.repository';
import { Not, In } from 'typeorm';

@Injectable()
export class FileService {
  protected readonly urlConfig: any;
  protected readonly url: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClientService: HttpClientService,

    private readonly fileRepository: FileRepository,

    private readonly i18n: I18nService,
  ) {
    this.configService = new ConfigService();
    this.urlConfig = this.configService.get('fileService');
    this.url = `http://${
      this.urlConfig?.options?.host + ':' + this.urlConfig?.options?.port
    }`;
  }

  async saveFiles(resourceId: any, resource: any, files: any): Promise<any> {
    // Delete Old Files
    if (resourceId != null) {
      await this.fileRepository.delete({
        resourceId: resourceId,
      });
    }
    // Save New Files
    if (!isEmpty(files)) {
      const fileResponse = await this.uploadFiles(files, resource);
      if (fileResponse.statusCode !== ResponseCodeEnum.SUCCESS) {
        return new ResponseBuilder()
          .withCode(fileResponse.statusCode)
          .withMessage(fileResponse.message)
          .build();
      }
      const fileDocuments = fileResponse.data.map((fileId, index) => ({
        resourceId: resourceId,
        resource: resource,
        fileId,
        filename: files[index].filename,
      }));

      return await this.fileRepository.createMany(fileDocuments);
    }
    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(await this.i18n.translate('error.SUCCESS'))
      .build();
  }

  private generateUrlFileService(type: string): string {
    return `${this.url}/api/v1/${type}`;
  }

  async uploadFiles(files: any[], resource: string): Promise<any> {
    const form = new FormData();
    form.append('service', 'purchased-request-service');
    form.append('resource', resource);
    files.forEach((file) => {
      form.append('files', Buffer.from(file.buffer), {
        filename: file.filename,
      });
    });

    return await this.httpClientService.post(
      this.generateUrlFileService(UPLOAD_FILE_ENPOINT.MULTIPLE),
      form,
      {
        ...form.getHeaders(),
        callInternalService: true,
      },
    );
  }

  async uploadFile(file: any, resource: string): Promise<any> {
    const form = new FormData();
    form.append('service', 'ticket-service');
    form.append('resource', resource);
    form.append('file', Buffer.from(file.data), {
      filename: file.filename,
    });

    return await this.httpClientService.post(
      this.generateUrlFileService(UPLOAD_FILE_ENPOINT.SINGLE),
      form,
      {
        ...form.getHeaders(),
        callInternalService: true,
      },
    );
  }

  async getFileById(fileId: string): Promise<any> {
    const response = await this.httpClientService.get(
      this.generateUrlFileService(
        UPLOAD_FILE_ENPOINT.GET_FILE.replace(':id', fileId),
      ),
    );
    if (response.statusCode !== ResponseCodeEnum.SUCCESS) {
      return {};
    }
    return response.data;
  }

  async deleteFileByIds(ids: string[]): Promise<any> {
    const respone = await this.httpClientService.delete(
      `${this.generateUrlFileService(UPLOAD_FILE_ENPOINT.MULTIPLE)}?ids=${ids.join(',')}`,
    );
    if (respone.statusCode != ResponseCodeEnum.SUCCESS) {
      return [];
    }
    return respone.data;
  }

  async getFiles(ids: string[]): Promise<any> {
    const fileIds = ids.join(',');
    const respone = await this.httpClientService.get(
      `${this.generateUrlFileService(
        UPLOAD_FILE_ENPOINT.GET_FILES,
      )}?ids=${fileIds}`,
    );
    if (respone.statusCode != ResponseCodeEnum.SUCCESS) {
      return [];
    }
    return respone.data;
  }
  async handleSaveFiles(
    resourceId: any,
    resource: any,
    oldFiles: any[],
    files: any[],
  ): Promise<any> {
    try {
      if (resourceId !== null) {
        const oldFileIds: any[] = [];
        if (!isEmpty(oldFiles)) {
          oldFiles.forEach((file: any) => {
            if (file && !isEmpty(file)) oldFileIds.push(file.id);
          });
        }
        const deleteFiles = await this.fileRepository.findAll({
          resource: resource,
          resourceId: resourceId,
          fileId: Not(In(oldFileIds)) as any,
        });

        if (!isEmpty(deleteFiles)) {
          for (const file of deleteFiles) {
            await this.fileRepository.softDelete(file.id, 0); // Assuming 0 as system user for now
          }
          await this.deleteFileByIds(
            deleteFiles.map((deleteFile) => deleteFile.fileId?.toString()),
          );
        }
      }
      if (!isEmpty(files)) {
        const fileResponse = await this.uploadFiles(files, resource);
        if (fileResponse.statusCode !== ResponseCodeEnum.SUCCESS) {
          return new ResponseBuilder()
            .withCode(fileResponse.statusCode)
            .withMessage(fileResponse.message)
            .build();
        }
        const fileUploadEntities = fileResponse.data.map((fileId) => ({
          resourceId: resourceId,
          resource: resource,
          fileId,
        }));

        await this.fileRepository.createMany(fileUploadEntities);
      }
    } catch (error) {
      console.log('error', error);
      return error;
    }
    return new ResponseBuilder()
      .withCode(ResponseCodeEnum.SUCCESS)
      .withMessage(await this.i18n.translate('error.SUCCESS'))
      .build();
  }
}
