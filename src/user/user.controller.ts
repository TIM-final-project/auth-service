/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  ClassSerializerInterceptor,
  Controller,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserQPs } from './interfaces/user.qps';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    @Inject(UserService) private userService: UserService,
  ) {}

  //@Get(':uuid')
  @MessagePattern('user_find_by_uuid')
  async getUser(uuid: string): Promise<UserDto> {
    return (await this.userService.findOne(uuid)) as UserDto;
  }

  @MessagePattern('user_find_all')
  async getUsers(UserQPs: UserQPs): Promise<UserDto[]> {
    return (await this.userService.findByRol(UserQPs)) as UserDto[];
  }
}
