import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config'
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    AuthModule
  ]
})
export class AppModule {}
