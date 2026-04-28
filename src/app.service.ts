import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    console.info('----init module-------');
    // await this.updatePermissions();
  }

  // async updatePermissions() {
  //   let status = false;
  //   let number = 1;
  //   do {
  //     try {
  //       const responseInsert =
  //         await this.userService.insertPermission(INSERT_PERMISSION);

  //       const responseDelete =
  //         await this.userService.deletePermissionNotActive();

  //       if (
  //         responseInsert.statusCode === ResponseCodeEnum.SUCCESS &&
  //         responseDelete.statusCode === ResponseCodeEnum.SUCCESS
  //       ) {
  //         status = true;
  //       } else {
  //         number++;
  //         setTimeout(function () {}, 5000);
  //       }
  //     } catch (err) {
  //       number++;
  //       setTimeout(function () {}, 5000);
  //     }
  //   } while (!status && number < 6);
  // }`

  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): string {
    return 'This is user-service';
  }
}
