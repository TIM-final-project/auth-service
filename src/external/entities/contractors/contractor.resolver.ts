import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/user.schema';
import { ContractorSchema } from './contractor.schema';
import { AllowedRol } from 'src/user/enum/user-rol.enum';

@Resolver(of => ContractorSchema)
export class ContractorResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField((of) => UserSchema)
  async user(@Parent() contractor: ContractorSchema): Promise<UserSchema> {
    return await this.userService.findByEntity(contractor.id,AllowedRol.CONTRACTOR);
  }
}