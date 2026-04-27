import { LANG_ENUM } from '@app/constant/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LangCurrent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const lang =
      req?.lang ||
      req.query?.lang ||
      req.params?.lang ||
      req.headers?.lang ||
      LANG_ENUM.VI;

    return lang;
  },
);
