import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JWT_SECRET_JEY } from "src/environments";
import { UserEntity } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService: UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET_JEY
        })
    }

    async validate(validationPayload: {userId: string, rol: string}): Promise<UserEntity> | null{
        return this.userService.findOne(validationPayload.userId);
    }
}