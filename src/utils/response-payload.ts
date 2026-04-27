import { ResponseCodeEnum } from '@app/constant/response-code.enum';

export interface ResponsePayload<T> {
  statusCode: ResponseCodeEnum;
  message?: string;
  data?: T;
}
