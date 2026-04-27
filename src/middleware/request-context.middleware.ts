import { requestContext } from '@app/core/context/request.context';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    requestContext.run({}, () => {
      next();
    });
  }
}
