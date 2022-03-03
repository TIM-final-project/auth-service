import {
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(@Inject(AuthService) private authService: AuthService) {}

  //@Post('login')
  @MessagePattern('login')
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user: UserEntity = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new RpcException({ message: 'Usuario o contraseña invalidos' });
    }

    return {
      ...user,
      access_token: this.authService.login(user).access_token,
    } as LoginResponseDto;
  }

  @MessagePattern('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    return new UserEntity(await this.authService.register(registerDto));
  }

  @MessagePattern('user_password_update')
  async updateByEntityId(
    updateUserDTO: UpdatePasswordDto,
  ) {
    this.logger.debug("Password update: ", updateUserDTO);
    return this.authService.updatePassword(updateUserDTO);
  }

  @MessagePattern('user_password_override')
  async overridePassword(
    updateUserDTO: UpdatePasswordDto,
  ) {
    this.logger.debug("Password update: ", updateUserDTO);
    return this.authService.updatePassword(updateUserDTO);
  }
}
