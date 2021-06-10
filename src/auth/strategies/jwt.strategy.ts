import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JWT_SECRET_JEY } from "src/environments";
import { UserSchema } from "src/user/user.schema";
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

    async validate(validationPayload: {userId: string, rol: string}): Promise<UserSchema> | null{
        return this.userService.findOne(validationPayload.userId);
    }
}