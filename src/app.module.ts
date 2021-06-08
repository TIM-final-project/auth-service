import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
