import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { UserResolver } from './user/user.resolver';
import { ContractorResolver } from './external/entities/contractors/contractor.resolver';
import { ContractorSchema } from './external/entities/contractors/contractor.schema';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useClass: TypeOrmConfigService
    }),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        orphanedTypes: [ContractorSchema]
      }
    }),
    AuthModule
  ],
  providers: [ContractorResolver]
})
export class AppModule {}
