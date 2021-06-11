import { Inject, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { Args, Resolver, Query, Mutation, Context} from "@nestjs/graphql";
import { UserSchema } from "./user.schema";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./args/create-user.input"
import { LoginUserInput } from "./args/login-user.input";
import { AuthService } from "src/auth/auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";

@Resolver(of => UserSchema )
export class UserResolver {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(AuthService) private authService: AuthService
    ){}

    @Query(returns => UserSchema)
    @UseGuards(GqlAuthGuard)
    async user(@Args('uuid') uuid: string): Promise<UserEntity>{
        return await this.userService.findOne(uuid);
    }

    @Query(returns => [UserSchema])
    @UseGuards(GqlAuthGuard)
    async users(): Promise<UserEntity[]>{
        return await this.userService.findAll();
    }

    @Mutation(returns => UserSchema)
    async register(
        @Args() input: CreateUserInput
    ): Promise<UserSchema>{
        return this.authService.register(input);

        //create user in entities
    }

    @Mutation(() => LoginDto)
    async loginUser(
        @Args() loginCredentials: LoginUserInput,
    ) {
        const user : UserSchema = await this.authService.validateUser(loginCredentials.username, loginCredentials.password);
        
        if (!user){
            throw new UnauthorizedException
        }

        return {
            ...user, 
            access_token: this.authService.login(user).access_token
        };
    }

}