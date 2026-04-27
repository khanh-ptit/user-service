// import fs from 'fs';
// import { isEmpty } from 'lodash';
// import * as ExcelJS from 'exceljs';
// import { Logger } from '@nestjs/common';
// import { I18nService } from 'nestjs-i18n';

// import { toStringImport } from '@app/helper/excel.helper';
// import { promiseHelper } from '@app/helper/promise.helper';
// import { DataSyncService } from '@app/components/data-sync/data-sync.service';
// import { InsertTempImportDataRequestDto } from '@app/components/data-sync/dto/insert-temp-import-data.request.dto';

// export interface ImportJobPayload {
//   requestId: string;
//   filePath: string;
//   sheetName: string;
//   importBy?: number;
// }

// // Định nghĩa interface base cho tất cả import data types
// export interface BaseImportData {
//   error?: string;
//   rawData: string;
// }

// export abstract class BaseImportConsumer<
//   T extends BaseImportData = BaseImportData,
// > {
//   protected readonly logger = new Logger(this.constructor.name);

//   constructor(
//     protected readonly i18n: I18nService,
//     protected readonly dataSyncService: DataSyncService,
//   ) {}

//   // Abstract methods - phải implement trong subclass
//   protected abstract getHeaderKeys(): string[];
//   protected abstract validateRowData(rowData: T): T;
//   protected abstract getConsumerName(): string;

//   // Template method - logic chung
//   protected async processDataImport(payload: ImportJobPayload): Promise<void> {
//     this.logger.log(
//       `Starting to process ${this.getConsumerName()} import data`,
//     );

//     const { sheetName } = payload;

//     try {
//       const workbook = new ExcelJS.stream.xlsx.WorkbookReader(
//         payload.filePath,
//         {
//           entries: 'emit',
//           hyperlinks: 'emit',
//           worksheets: 'emit',
//           sharedStrings: 'cache',
//         },
//       );

//       let totalCount = 0;
//       let successCount = 0;
//       let currentRowNumber = 0;

//       const headerKeys = this.getHeaderKeys();

//       for await (const worksheetReader of workbook) {
//         const ws: any = worksheetReader;

//         this.logger.log(`Found sheet: ${ws?.name}`);

//         if (ws.name !== sheetName) {
//           this.logger.log(`Skipping sheet: ${ws?.name}`);
//           continue;
//         }

//         this.logger.log(`Processing target sheet: ${sheetName}`);

//         const importLog = await this.dataSyncService.createImportLog({
//           requestId: payload.requestId,
//           userId: payload.importBy || 0,
//           rootFileName: `./uploads/${payload.requestId}.xlsx`,
//           serviceName: this.getConsumerName(),
//         });

//         for await (const row of ws) {
//           currentRowNumber++;
//           this.logger.log(`Reading row ${currentRowNumber}`);

//           if (currentRowNumber === 1) {
//             this.logger.log('Skipping header row');
//             continue;
//           }

//           totalCount++;

//           try {
//             const rowData = this.mapRowToData(headerKeys, row?.values);
//             const validatedData = this.validateRowData(rowData);

//             if (isEmpty(validatedData?.error)) {
//               successCount++;
//             }

//             await this.processToDataSync(
//               payload.requestId,
//               validatedData,
//               sheetName,
//               currentRowNumber,
//               importLog?.id,
//             );

//             // Giảm tải hệ thống
//             await promiseHelper.sleep(10);
//             this.logger.log(`Successfully processed row ${currentRowNumber}`);
//           } catch (err) {
//             this.logger.error(
//               `Error processing row ${currentRowNumber}: ${err.message}`,
//             );
//           }
//         }

//         if (!isEmpty(importLog)) {
//           await this.dataSyncService.updateImportLog({
//             id: importLog?.id,
//             requestId: payload.requestId,
//             totalCount,
//             successCount,
//             serviceName: this.getConsumerName(),
//           });
//         }

//         break;
//       }

//       this.logger.log('Import completed');
//     } catch (error) {
//       this.logger.error('Error during Excel file processing:', error.message);
//       throw error;
//     } finally {
//       await this.cleanupFile(payload.filePath);
//       this.logger.log(
//         `Finished processing ${this.getConsumerName()} import data`,
//       );
//     }
//   }

//   private mapRowToData(headerKeys: string[], rowValues: any[]): T {
//     if (!Array.isArray(rowValues)) {
//       return {} as T;
//     }

//     const values = rowValues
//       .slice(1)
//       .map((value) =>
//         value == null ? '' : toStringImport(String(value).trim()),
//       );

//     const rowData = Object.fromEntries(
//       headerKeys.map((key, index) => [key, values[index] || '']),
//     );

//     return {
//       ...rowData,
//       rawData: JSON.stringify(values),
//     } as T;
//   }

//   private async processToDataSync(
//     requestId: string,
//     rowData: T,
//     sheetName: string,
//     rowIndex: number,
//     importLogId?: string,
//     sessionId?: string,
//   ) {
//     const payload: InsertTempImportDataRequestDto = {
//       data: [
//         {
//           requestId: sessionId ?? '',
//           importLogId: importLogId ?? '',
//           sheetIndex: 1,
//           sheetName: sheetName,
//           rowIndex: rowIndex,
//           rowData: rowData.rawData,
//           reason: rowData.error,
//           importResult: isEmpty(rowData.error) ? 1 : 0,
//         },
//       ],
//     };

//     await this.dataSyncService.insertTempImportData(payload);
//   }

//   private async cleanupFile(filePath: string): Promise<void> {
//     return new Promise((resolve) => {
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           this.logger.error(`Error deleting file ${filePath}: ${err.message}`);
//         } else {
//           this.logger.log(`Temporary file ${filePath} deleted.`);
//         }
//         resolve();
//       });
//     });
//   }
// }
