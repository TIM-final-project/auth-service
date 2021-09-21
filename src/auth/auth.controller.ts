import { Body, ClassSerializerInterceptor, Controller, Inject, Post, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService
    ){}
    
    //@Post('login')
    @MessagePattern('login')
    async login(loginDto: LoginDto): Promise<LoginResponseDto>{
        
        const user: UserEntity = await this.authService.validateUser(loginDto.username, loginDto.password);
        
        if (!user){
            throw new UnauthorizedException
        }

        return {
            ...user,
            access_token: this.authService.login(user).access_token
        } as LoginResponseDto;
    }
    
    //@Post("register")
    @MessagePattern('register')
    @UseInterceptors(ClassSerializerInterceptor)
    async register(registerDto: RegisterDto): Promise<UserEntity>{
        return new UserEntity(await this.authService.register(registerDto));
    }

}
