import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { CreateUserService } from './commands/create-user.service';
import { GetListUserRequestDto } from './dto/request/get-list-user.request.dto';
import { GetListUserService } from './commands/get-list-user.service';
import { GetDetailUserService } from './commands/get-detail-user.service';

@Controller('')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getListUserService: GetListUserService,
    private readonly getDetailUserService: GetDetailUserService,
  ) {}

  @Post('')
  create(@Body() body: CreateUserRequestDto) {
    return this.createUserService.execute(body);
  }

  @Get('list')
  getList(@Query() query: GetListUserRequestDto) {
    return this.getListUserService.execute(query);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.getDetailUserService.execute(Number(id));
  }
}
