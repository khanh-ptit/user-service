import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Skip transformation for specific endpoints or if data is already transformed
        if (data && data.data !== undefined) {
          data.statusCode = 200;
          return data;
        }

        // If data is an object with only a message property, flatten it
        if (
          data &&
          typeof data === 'object' &&
          Object.keys(data).length === 1 &&
          'message' in data
        ) {
          return { message: data.message, statusCode: 200 };
        }

        return { data, statusCode: 200 };
      }),
    );
  }
}
