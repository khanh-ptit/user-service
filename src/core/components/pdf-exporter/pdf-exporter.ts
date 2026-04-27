import pdfmake from 'pdfmake';
import * as path from 'path';
import { SRC_DIR } from '@app/main';
import { FastifyReply } from 'fastify';

type PdfExporterOptions = {
  styles?: Record<string, any>;
  pageSize?: 'A4' | 'A3' | 'LETTER';
  pageOrientation?: 'portrait' | 'landscape';
  pageMargins?: number[]; // [l,t,r,b]
};

export class PdfExporter {
  constructor(
    private readonly fileName: string,
    private readonly reply: FastifyReply,
    private readonly content: any[],
    private readonly options: PdfExporterOptions = {},
  ) {}

  async export(): Promise<FastifyReply> {
    try {
      const fonts = {
        NotoSansJP: {
          normal: path.join(SRC_DIR, 'static/fonts/times-new-roman.ttf'),
          bold: path.join(SRC_DIR, 'static/fonts/times-new-roman-bold.ttf'),
          italics: path.join(
            SRC_DIR,
            'static/fonts/times-new-roman-italic.ttf',
          ),
          bolditalics: path.join(
            SRC_DIR,
            'static/fonts/times-new-roman-bold-italic.ttf',
          ),
        },
      };

      const dd = {
        pageSize: this.options.pageSize ?? 'A4',
        pageOrientation: this.options.pageOrientation ?? 'portrait',
        pageMargins: this.options.pageMargins ?? [10, 10, 10, 10],
        content: this.content || [],
        styles: this.options.styles || {},
        defaultStyle: {
          fontSize: 10,
          font: 'NotoSansJP',
        },
      };

      // Tạo PDF document
      const printer = new pdfmake(fonts);
      const pdfDoc = printer.createPdfKitDocument(dd);

      this.reply.raw.setHeader('Content-Type', 'application/pdf');

      this.reply.raw.setHeader('Access-Control-Allow-Origin', '*');
      this.reply.raw.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      this.reply.raw.setHeader(
        'Access-Control-Expose-Headers',
        'Content-Disposition',
      );
      this.reply.raw.setHeader(
        'Content-Disposition',
        `attachment; filename=${encodeURIComponent(this.fileName)}`,
      );

      pdfDoc.pipe(this.reply.raw);
      pdfDoc.end();

      return this.reply;
    } catch (error) {
      console.error('download:: ', error);
      this.reply.raw.statusCode = 500;
      this.reply.raw.end('Internal Server Error');
      return this.reply;
    }
  }
}
