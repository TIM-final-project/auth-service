import { Injectable } from '@nestjs/common';
import { UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async validateUser(username: string, pass: string): Promise<UserSchema> {
        const user = await this.userService.findOneByUsername(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }
    

}
