import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { ContractorSchema } from './external/entities/contractors/contractor.schema';
import { DriverSchema } from './external/entities/drivers/driver.schema';
import { AuditorSchema } from './external/entities/auditors/auditor.schema';
import { ManagerSchema } from './external/entities/managers/manager.schema';
import { SecuritySchema } from './external/entities/security/security.schema';

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
        orphanedTypes: [ContractorSchema, DriverSchema, AuditorSchema, ManagerSchema, SecuritySchema]
      }
    }),
    AuthModule
  ]
})
export class AppModule {}
