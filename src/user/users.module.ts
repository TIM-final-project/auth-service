import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    forwardRef(() => AuthModule)
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UsersModule {}