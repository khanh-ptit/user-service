import { FileAbstractDto } from '@app/core/dto/file-upload.request';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

export type TemplateColumn = {
  header: string;
  key: string;
  address: string;
  gt?: number;
  isRequired?: boolean;
  requiredBy?: string;
  enumVal?: any;
  isDate?: boolean;
  dateFormat?: string;
};

export class ExcelStream {
  requestId: string;
  file: FileAbstractDto;
  template: TemplateColumn[];
  options: { dataStartAt?: number };

  constructor(
    requestId: string,
    file: FileAbstractDto,
    template: TemplateColumn[],
    options: { dataStartAt?: number } = {},
  ) {
    this.requestId = requestId;
    this.file = file;
    this.template = template;
    this.options = options;
  }

  async readStream<T>(onRow: (rowData: T, rowNumber: number) => Promise<void>) {
    const tmpDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const filePath = path.join(tmpDir, `${this.requestId}.xlsx`);

    try {
      fs.writeFileSync(filePath, Buffer.from(this.file.buffer));

      const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(filePath, {
        entries: 'emit',
        sharedStrings: 'cache',
        hyperlinks: 'ignore',
        worksheets: 'emit',
        styles: 'ignore',
      });

      for await (const worksheetReader of workbookReader) {
        for await (const row of worksheetReader) {
          if (row.number < (this.options.dataStartAt || 1)) continue; // bỏ header
          const rowData: T = {} as T;
          this.template.forEach((col) => {
            rowData[col.key] = row.getCell(col.address).value;
          });
          await onRow(rowData, row.number);
        }
      }
    } catch (error) {
      console.error('Error processing Excel file:', error);
      this.cleanupFile(filePath);
    } finally {
      this.cleanupFile(filePath);
    }
  }

  private cleanupFile(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      }
    });
  }
}
