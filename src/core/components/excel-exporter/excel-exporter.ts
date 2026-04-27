import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

type Column = { header: string; key: string } & Partial<
  Omit<ExcelJS.Column, 'header' | 'key'>
>;

type YieldStrategy =
  | { type: 'immediate' }
  | { type: 'timeout'; ms: number }
  | { type: 'none' };

interface SheetConfig<T extends object> {
  name: string;
  columns: Column[];

  fetchBatch?: (ctx: { page: number; limit: number }) => Promise<T[]>;
  dataIterator?: () => AsyncIterable<T>;

  mapRow?: (row: T) => any;
}

interface ExcelExporterOptions {
  filePath: string;
  batchSize?: number;
  yieldEvery?: number;
  yieldStrategy?: YieldStrategy;
  useSharedStrings?: boolean;
}

export class ExcelExporter {
  private batchSize: number;
  private yieldEvery: number;
  private yieldStrategy: YieldStrategy;

  constructor(
    private readonly opts: ExcelExporterOptions,
    private readonly sheets: SheetConfig<any>[],
  ) {
    this.batchSize = opts.batchSize ?? 500;
    this.yieldEvery = opts.yieldEvery ?? 500;
    this.yieldStrategy = opts.yieldStrategy ?? { type: 'immediate' };
  }

  private async doYield() {
    const y = this.yieldStrategy;
    if (y.type === 'none') return;

    if (y.type === 'immediate') {
      await new Promise<void>((r) => setImmediate(r));
    }
    if (y.type === 'timeout') {
      await new Promise<void>((r) => setTimeout(r, y.ms));
    }
  }

  async export(): Promise<string> {
    fs.mkdirSync(path.dirname(this.opts.filePath), { recursive: true });

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      filename: this.opts.filePath,
      useSharedStrings: this.opts.useSharedStrings ?? false,
    });

    for (const sheetCfg of this.sheets) {
      const ws = workbook.addWorksheet(sheetCfg.name);
      ws.columns = sheetCfg.columns as ExcelJS.Column[];

      let written = 0;

      const writeRow = async (row: any) => {
        row.index = written + 1;
        ws.addRow(sheetCfg.mapRow ? sheetCfg.mapRow(row) : row).commit();
        written++;

        if (written % this.yieldEvery === 0) {
          await this.doYield();
        }
      };

      // iterator mode
      if (sheetCfg.dataIterator) {
        for await (const row of sheetCfg.dataIterator()) {
          await writeRow(row);
        }
      }

      // batch mode
      if (sheetCfg.fetchBatch) {
        let page = 1;
        while (true) {
          const batch = await sheetCfg.fetchBatch({
            page,
            limit: this.batchSize,
          });
          if (!batch || batch.length === 0) break;

          for (const row of batch) {
            await writeRow(row);
          }

          if (batch.length < this.batchSize) break;

          page += 1;

          await this.doYield();
        }
      }
    }

    await workbook.commit();
    return this.opts.filePath;
  }
}
