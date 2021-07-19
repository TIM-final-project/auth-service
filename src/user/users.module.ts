import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContractorResolver } from 'src/external/entities/contractors/contractor.resolver';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    forwardRef(() => AuthModule)
  ],
  providers: [UserService, UserResolver, ContractorResolver],
  exports: [UserService]
})
export class UsersModule {}