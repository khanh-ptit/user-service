import { ConfigService } from '@app/config/config.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isEmpty } from 'lodash';
import { AuthService } from '../components/auth/auth.service';
import { PERMISSION_CODE } from '../decorator/get-code.decorator';
import { IS_PUBLIC_KEY } from '../decorator/set-public.decorator';
import { requestContext } from '../context/request.context';
import { UserService } from '@app/components/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthorizationGuard implements CanActivate {
  private readonly configService: ConfigService;

  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.configService = new ConfigService();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req = await context.switchToHttp().getRequest();
    // req.lang = req.query.lang = req.params.lang = req.headers.lang;
    const token =
      context.getType() === 'rpc'
        ? `Bearer ${this.configService.get('internalToken')}`
        : req.headers['authorization'];

    if (
      req.headers?.['authorization'] ===
      `Bearer ${this.configService.get('internalToken')}`
    ) {
      return true;
    }
    const permissionCode = this.reflector.getAllAndOverride<string>(
      PERMISSION_CODE,
      [context.getHandler(), context.getClass()],
    );
    const res = await this.authService.validateToken(token, permissionCode);

    const user = res.data;
    if (res) {
      if (res.statusCode !== 200) {
        throw new HttpException(res.message, res.statusCode);
      }
      if (user && !isEmpty(user)) {
        req.user = user;
        const store = requestContext.getStore();
        if (store) {
          const buyerDepartment =
            await this.userService.getDefaultBuyerDepartment();

          store.userId = user.id;
          store.isSupperAdmin = user.code === '000000001';
          store.isBuyerDepartment = user.userAssignments?.some(
            (ua) => ua.departmentId === buyerDepartment?.id,
          );
          store.orgPaths = user.userAssignments?.map((ua) => ua.mPath) || [];
        }
      }

      if (res.statusCode !== 200) {
        throw new HttpException(res.message, res.statusCode);
      }
      if (req.body && user && !isEmpty(user)) {
        req.body.user = user;
        req.body.userId = user?.id;
      }
      if (req.params && user && !isEmpty(user)) {
        req.params.user = user;
        req.params.userId = user?.id;
      }
      if (req.query && user && !isEmpty(user)) {
        req.query.user = user;
        req.query.userId = user?.id;
      }
      req.authorized = user?.authorized;
      return true;
    }

    return false;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
