import { ObjectType, Field, registerEnumType, ID, Directive, Int } from '@nestjs/graphql';
import { ContractorSchema } from 'src/external/entities/contractors/contractor.schema';
import { AllowedRol } from './enum/user-rol.enum';

registerEnumType(AllowedRol, {
    name: 'AllowedRol',
});

@ObjectType()
@Directive('@key(fields: "uuid")')
export class UserSchema {
    @Field((type) => ID)
    uuid?: string;

    @Field()
    username: string;

    @Field()
    password?: string;
    
    @Field(type => AllowedRol)
    rol: string;
  
    @Field()
    active?: boolean;
  
    @Field()
    created_at?: Date;
  
    @Field()
    updated_at?: Date;

    @Field((type) => Int)
    entityId?: number

    @Field((type) => ContractorSchema)
    contractor?: ContractorSchema;
}