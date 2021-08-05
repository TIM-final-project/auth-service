import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/user.schema';
import { AllowedRol } from 'src/user/enum/user-rol.enum';
import { AuditorSchema } from './auditor.schema';

@Resolver(of => AuditorSchema)
export class AuditorResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField((of) => UserSchema)
  async user(@Parent() auditor: AuditorSchema): Promise<UserSchema> {
    return await this.userService.findByEntity(auditor.id, AllowedRol.AUDITOR);
  }
}