import { ResponseCodeEnum } from '@app/constant/response-code.enum';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ValidationError,
} from '@nestjs/common';
import { KafkaContext, NatsContext } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { from } from 'rxjs';

export class BusinessException extends Error {
  public statusCode: ResponseCodeEnum;

  constructor(message: string, statusCode = ResponseCodeEnum.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationException extends Error {
  public errors: ValidationError[];
  constructor(validationErrors: ValidationError[] = []) {
    super('Validate Failed');
    this.errors = validationErrors;
  }
}

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const [req, res] = host.getArgs();
    const { statusCode } = exception;
    const message = exception.message as any;

    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      response.status(statusCode).send({
        statusCode,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    } else if (host.getType() === 'rpc') {
      if (res.constructor.name === 'NatsContext') {
        const response: NatsContext = res;

        const info: Record<string, any> = {
          statusCode,
          message,
          details: {
            subject: response.getSubject(),
            request: req,
          },
        };
        return from([info]);
      }
      if (res.constructor.name === 'KafkaContext') {
        const response: KafkaContext = res;

        const info: Record<string, any> = {
          statusCode,
          message,
          details: {
            topic: response.getTopic(),
            partition: response.getPartition(),
            offset: response.getMessage().offset,
            request: req,
          },
        };
        return from([info]);
      }
    }
  }
}
