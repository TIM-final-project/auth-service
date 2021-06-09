import { Inject, UseGuards, Request } from "@nestjs/common";
import { Args, Resolver, Query, Mutation} from "@nestjs/graphql";
import { UserSchema } from "./user.schema";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { CreateUserInput } from "./dto/create-user.input"
import { LoginUserInput } from "./dto/login-user.input";
import { AuthGuard } from "@nestjs/passport";


@Resolver(of => UserSchema )
export class UserResolver {
    constructor(
        @Inject(UserService) private userService: UserService
    ){}

    @Query(returns => UserSchema)
    async user(@Args('uuid') uuid: string): Promise<UserEntity>{
        return await this.userService.findOne(uuid);
    }

    @Query(returns => [UserSchema])
    async users(): Promise<UserEntity[]>{
        return await this.userService.findAll();
    }

    @Mutation(returns => UserSchema)
    async createUser(
        @Args() input: CreateUserInput
    ): Promise<UserSchema>{
        const userSchema : UserSchema = await this.userService.create(input);
        return userSchema;
    }

    @Mutation(() => UserSchema)
    @UseGuards(AuthGuard('local'))
    async loginUser(
        @Args() data: LoginUserInput,
    ) {
        return {username: "test"};
    }
}