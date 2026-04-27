// import * as fs from 'fs';
// import { I18nService } from 'nestjs-i18n';
// import * as path from 'path';
// import * as ExcelJS from 'exceljs';
// import { isEmpty, isNil } from 'lodash';
// import { TemplateColumn } from '../../excel-stream/excel-stream';
// import { FileAbstractDto } from '@app/core/dto/file-upload.request';
// import { RabbitMqServiceInterface } from '@app/core/transporter/rabbitmq/interfaces/rabbitmq.service.interface';
// import { BusinessException } from '@app/core/exception-filters/business-exception.filter';
// import { excelDateToJSDate } from '@app/utils/common';
// import { generateString } from '@app/helper/string.helper';
// import { ImportFileRequestDto } from '../../dto/import/request/import-file.request.dto';
// import { ImportStatusEnum } from '@app/components/import/import.constant';
// import dayjs from 'dayjs';

// export abstract class ImportAbstractService {
//   protected abstract readonly rabbitMqService: RabbitMqServiceInterface;
//   protected abstract readonly i18n: I18nService;
//   protected abstract readonly template: TemplateColumn[];
//   protected abstract readonly dataStartAt: number;

//   async addToQueue(
//     req: ImportFileRequestDto,
//     queueName: string,
//     type: ImportLogTypeEnum,
//   ) {
//     const sessionId = await generateString();

//     const { filePath } = this.saveTmpFile(req.file, sessionId);

//     const importLog = await this.datasyncService.createImportLog({
//       rootFileName: req.file.filename,
//       serviceName: 'purchased-request-service',
//       userId: req.userId,
//       status: ImportStatusEnum.PROCESSING,
//       type: type,
//       requestId: sessionId,
//     });

//     await this.rabbitMqService.addToQueue(queueName, {
//       sessionId,
//       filePath,
//       importLogId: importLog?.id,
//       data: (req as any)?.data ?? undefined,
//     });

//     return { sessionId, filePath, importLogId: importLog?.id };
//   }

//   protected saveTmpFile(
//     file: FileAbstractDto,
//     sessionId: string,
//   ): { filePath: string; filename: string } {
//     const tmpDir = path.join(process.cwd(), 'tmp');
//     if (!fs.existsSync(tmpDir)) {
//       fs.mkdirSync(tmpDir, { recursive: true });
//     }
//     const filename = `${sessionId}.xlsx`;
//     const filePath = path.join(tmpDir, filename);
//     fs.writeFileSync(filePath, Buffer.from(file.buffer));
//     return { filePath, filename };
//   }

//   protected cleanupFile(filePath: string) {
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error(`Error deleting file ${filePath}:`, err);
//       }
//     });
//   }

//   protected async readStream<T>(
//     filePath: string,
//     sheetHandlers: ((
//       rowData: T,
//       rowNumber: number,
//       sheetNumber: number,
//     ) => Promise<void>)[],
//   ) {
//     try {
//       if (!fs.existsSync(filePath)) {
//         throw new Error(`File not found: ${filePath}`);
//       }

//       const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {
//         entries: 'emit',
//         sharedStrings: 'cache',
//         hyperlinks: 'ignore',
//         worksheets: 'emit',
//         styles: 'ignore',
//       });
//       await workbookReader.read();

//       let sheetIndex = 0;
//       for await (const worksheetReader of workbookReader) {
//         const handler = sheetHandlers[sheetIndex];
//         if (!handler) continue;

//         for await (const row of worksheetReader) {
//           if (row.number < (this.dataStartAt || 1)) continue; // bỏ header
//           const rowData: T = {} as T;
//           for (const col of this.template) {
//             const cellValue = row.getCell(col.address).value;
//             if (!isNil(cellValue)) {
//               rowData[col.key] = cellValue;
//             }
//           }

//           if (isEmpty(rowData)) break;
//           await handler(rowData, row.number, sheetIndex);
//         }

//         sheetIndex++;
//       }
//     } catch (error) {
//       console.error('Error processing Excel file:', error);
//       this.cleanupFile(filePath);
//     }
//   }

//   protected validateInput(row: any) {
//     for (const config of this.template) {
//       const { key, gt, enumVal, isDate } = config;
//       const isRequired = config.isRequired || !!row[config.requiredBy as any];
//       const isEmptyVal = isNil(row[key]) || row[key]?.toString()?.trim() == '';
//       // validate require
//       if (isRequired && isEmptyVal) {
//         throw new BusinessException(this.requiredMsg(key));
//       }

//       if (!isRequired && isEmptyVal) continue;

//       // validate invalid input
//       const isInvalid =
//         (!isNil(gt) && row[key] <= gt) ||
//         (!isNil(enumVal) && !Object.values(enumVal).includes(row[key]));

//       if (isInvalid) {
//         throw new BusinessException(this.invalidMsg(key));
//       }

//       if (isDate) {
//         if (typeof row[key] === 'number') {
//           row[key] = excelDateToJSDate(row[key]);
//         }

//         if (typeof row[key] === 'string') {
//           const args: any[] = [row[key]];
//           if (config.dateFormat) {
//             args.push(config.dateFormat, true);
//           }

//           if (!dayjs(...args).isValid()) {
//             throw new BusinessException(this.invalidMsg(key));
//           }
//           row[key] = dayjs(...args).toDate();
//         }
//       }
//     }
//   }

//   protected requiredMsg(colname: string): string {
//     return this.i18n.translate('error.FIELD_IMPORT_REQUIRED', {
//       args: {
//         colname: this.i18n.translate(
//           `import.purchaseRequestItem.colname.${colname}`,
//         ),
//       },
//     });
//   }

//   protected invalidMsg(colname: string): string {
//     return this.i18n.translate('error.IMPORT_FIELD_INVALID', {
//       args: {
//         colname: this.i18n.translate(
//           `import.purchaseRequestItem.colname.${colname}`,
//         ),
//       },
//     });
//   }

//   protected notFoundMsg(colname: string): string {
//     return this.i18n.translate('error.IMPORT_FIELD_NOT_FOUND', {
//       args: {
//         colname: this.i18n.translate(
//           `import.purchaseRequestItem.colname.${colname}`,
//         ),
//       },
//     });
//   }

//   protected async onCompleted(
//     task: { filePath: string; importLogId: string },
//     result: {
//       totalCount: number;
//       successCount: number;
//     },
//   ) {
//     const { filePath, importLogId } = task;

//     this.cleanupFile(filePath);

//     await this.datasyncService.updateImportLog({
//       id: importLogId,
//       totalCount: result.totalCount,
//       successCount: result.successCount,
//       status: ImportStatusEnum.SUCCESS,
//     });
//   }
// }
