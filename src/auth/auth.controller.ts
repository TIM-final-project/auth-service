/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, ClassSerializerInterceptor, Controller, Inject, Post, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
        @Inject(UserService) private userService: UserService,
    ){}
    
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto>{
        
        const user: UserEntity = await this.authService.validateUser(loginDto.username, loginDto.password);
        
        if (!user){
            throw new UnauthorizedException
        }

        return {
            ...user, 
            access_token: this.authService.login(user).access_token
        } as LoginResponseDto;
    }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<UserEntity>{
        return new UserEntity(await this.authService.register(registerDto));
    }

}
