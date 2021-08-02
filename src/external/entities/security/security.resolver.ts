import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/user.schema';
import { AllowedRol } from 'src/user/enum/user-rol.enum';
import { SecuritySchema } from './security.schema';

@Resolver(of => SecuritySchema)
export class SecurityResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField((of) => UserSchema)
  async user(@Parent() security: SecuritySchema): Promise<UserSchema> {
    return await this.userService.findByEntity(security.id, AllowedRol.SECURITY);
  }
}