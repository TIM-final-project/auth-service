import { ObjectType, Field, registerEnumType, ID, Directive } from '@nestjs/graphql';
import { AllowedRol } from './enum/user-rol.enum';

registerEnumType(AllowedRol, {
    name: 'AllowedRol',
});

@ObjectType()
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
}