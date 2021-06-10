import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_JEY } from 'src/environments';
import { UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
      private userService: UserService,
      private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<UserSchema> | null {
        const user = await this.userService.findOneByUsername(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }
    
    login(user: UserSchema): { access_token: string }{
      const payload = {
        userId: user.uuid,
        rol: user.rol
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    async verify(token: string): Promise<UserSchema> {
      const decoded = this.jwtService.verify(token,{
        secret: JWT_SECRET_JEY
      });

      const user = this.userService.findOne(decoded.uuid);

      if(!user){
        throw new Error('No se encontro el usuario dentro del token');
      }

      return user;
    }

}
