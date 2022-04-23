import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_JEY } from 'src/environments';
import { UserService } from 'src/user/user.service';
import { compare, genSalt, hash } from 'bcrypt'
import { UserEntity } from 'src/user/user.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdatePasswordDto } from 'src/user/dto/update-user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserEntity> | null {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.active) {
      const isMatch = await compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result as UserEntity;
      }
    }

    return null;
  }

  login(user: UserEntity): { access_token: string } {
    const payload = {
      userId: user.uuid,
      rol: user.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(credentials: RegisterDto): Promise<UserEntity> {
    const user = await this.userService.findOneByUsername(credentials.username);

    if (user) {
      this.logger.debug(`Username ${user.username} already exists`);
      throw new RpcException({
        message: `Nombre de usuario existente`,
      });
    }

    const saltOrRounds = await genSalt();
    const myhash: string = await hash(credentials.password, saltOrRounds);

    credentials.password = myhash;

    this.logger.debug(`Creating user: ${credentials.username}`);
    return this.userService.create(credentials);
  }

  async verify(token: string): Promise<UserDto> {
    const decoded = this.jwtService.verify(token, {
      secret: JWT_SECRET_JEY,
    });

    const user: UserEntity = await this.userService.findOne(decoded.uuid);

    if (!user) {
      throw new Error('No se encontro el usuario dentro del token');
    }

    return user as UserDto;
  }

  async updatePassword(
    updateUserDTO: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.userService.findByEntity(updateUserDTO.entityId, updateUserDTO.rol);

    if(user){
      this.logger.debug(`User found: ${user.username}`);

      const saltOrRounds = await genSalt();
      const myhash: string = await hash(updateUserDTO.new_password, saltOrRounds);
  
      user.password = myhash;
  
      return this.userService.update(user);
    }

    throw new RpcException("Usuario no encontrado, no es posible modificar la contraseña");
  }

}
