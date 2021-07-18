import { Inject, UseGuards, UnauthorizedException } from "@nestjs/common";
import { Args, Resolver, Query, Mutation, ResolveField, Parent} from "@nestjs/graphql";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { CreateUserInput } from "./args/create-user.input"
import { LoginUserInput } from "./args/login-user.input";
import { AuthService } from "src/auth/auth.service";
import { LoginDto } from "src/auth/dto/login.dto";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { UserDto } from "./dto/user.dto";
import { UpdateUserInput } from "./args/update-user.input";
import { ContractorSchema } from "src/external/entities/contractors/contractor.schema";

@Resolver(of => UserSchema )
export class UserResolver {
    constructor(
        @Inject(UserService) private userService: UserService,
        @Inject(AuthService) private authService: AuthService
    ){}

    //Read user
    @Query(returns => UserDto)
    //@UseGuards(GqlAuthGuard)
    async user(@Args('uuid') uuid: string): Promise<UserDto>{
        return await this.userService.findOne(uuid);
    }

    //Read users
    @Query(returns => [UserDto])
    @UseGuards(GqlAuthGuard)
    async users(): Promise<UserDto[]>{
        return await this.userService.findAll();
    }

    //Create user
    @Mutation(returns => UserDto)
    async createUser(
        @Args() input: CreateUserInput
    ): Promise<UserDto>{
        return this.authService.register(input);

        //create user in entities
    }

    //Update user
    @Mutation(returns => UserDto)
    async updateUser(
        @Args() input: UpdateUserInput
    ): Promise<UserDto>{

        return null;
        //create user in entities
    }

    //Login user
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

    @ResolveField((of) => ContractorSchema)
    contractor(@Parent() user: UserSchema): any {
        return { __typename: 'Contractor', id: user.entityId };
    }

}