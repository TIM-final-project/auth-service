import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/user.schema';
import { AllowedRol } from 'src/user/enum/user-rol.enum';
import { ManagerSchema } from './manager.schema';

@Resolver(of => ManagerSchema)
export class ManagerResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField((of) => UserSchema)
  async user(@Parent() manager: ManagerSchema): Promise<UserSchema> {
    return await this.userService.findByEntity(manager.id, AllowedRol.MANAGER);
  }
}