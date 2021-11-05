import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
