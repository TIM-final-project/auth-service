import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/user.schema';
import { AllowedRol } from 'src/user/enum/user-rol.enum';
import { DriverSchema } from './driver.schema';

@Resolver(of => DriverSchema)
export class DriverResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField((of) => UserSchema)
  async user(@Parent() driver: DriverSchema): Promise<UserSchema> {
    return await this.userService.findByEntity(driver.id, AllowedRol.DRIVER);
  }
}