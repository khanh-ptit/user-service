import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MultipartBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    if (typeof req.isMultipart !== 'function' || !req.isMultipart()) {
      return next.handle();
    }

    return from(this.parseMultipart(req)).pipe(switchMap(() => next.handle()));
  }

  private async parseMultipart(req: FastifyRequest) {
    const parts = req.parts();
    const body: Record<string, any> = {
      user: (req as any)?.user,
      userId: (req as any)?.user?.id,
    };
    const files: Record<string, any[]> = {};

    for await (const part of parts) {
      if (part.type === 'file') {
        const buffer = await part.toBuffer();
        const fileData = {
          fieldname: part.fieldname,
          filename: part.filename,
          encoding: part.encoding,
          mimetype: part.mimetype,
          buffer,
        };

        if (!files[part.fieldname]) files[part.fieldname] = [];
        files[part.fieldname].push(fileData);
      } else {
        try {
          body[part.fieldname] = JSON.parse(part.value as string);
        } catch {
          body[part.fieldname] = part.value;
        }
      }
    }

    (req as any).body = body;
    (req as any).files = files;
  }
}
