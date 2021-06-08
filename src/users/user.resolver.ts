import { Inject } from "@nestjs/common";
import { Args, Resolver, Query, Mutation} from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";


@Resolver(of => User )
export class UserResolver {
    constructor(
        @Inject(UserService) private userService: UserService
    ){}

    @Query(returns => User)
    async user(@Args('uuid') uuid: string){
        return this.userService.findOne(uuid);
    }

    @Query(returns => [User])
    async users(): Promise<User[]>{
        return await this.userService.findAll();
    }

    @Mutation(returns => User)
    async createUser(
        @Args('username') username: string,
        @Args('password') password: string,
        @Args('rol') rol: string
    ): Promise<User>{
        return await this.userService.create({username, password, rol})
    }
}