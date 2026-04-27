import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const UploadedFile = createParamDecorator(
  (fieldName: string = 'files', ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    const files = (req as any).files || [];

    if (!fieldName) return files;

    const fieldFiles = files[fieldName];
    if (!fieldFiles) return null;

    return fieldFiles;
  },
);
