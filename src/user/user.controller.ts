/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController { 
    constructor(
        @Inject(UserService) private userService: UserService,
    ){}

    @Get(':uuid')
    async getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<UserDto>{
        return await this.userService.findOne(uuid) as UserDto;
    }

    @Patch(':uuid')
    async update(@Param('uuid', new ParseUUIDPipe()) uuid: string, @Body() updateUserDTO: UpdateUserDto){
        return await this.userService.update(uuid, updateUserDTO) as UserDto;
    }

}
