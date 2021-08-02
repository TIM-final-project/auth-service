import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuditorResolver } from 'src/external/entities/auditors/auditor.resolver';
import { ContractorResolver } from 'src/external/entities/contractors/contractor.resolver';
import { DriverResolver } from 'src/external/entities/drivers/driver.resolver';
import { ManagerResolver } from 'src/external/entities/managers/manager.resolver';
import { SecurityResolver } from 'src/external/entities/security/security.resolver';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    forwardRef(() => AuthModule)
  ],
  providers: [UserService, UserResolver, ContractorResolver, DriverResolver, AuditorResolver, ManagerResolver, SecurityResolver],
  exports: [UserService]
})
export class UsersModule {}