import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class UserSchema {
    @Field()
    uuid?: string;

    @Field()
    username: string;

    @Field()
    password?: string;
    
    @Field()
    rol: string;
  
    @Field()
    active?: boolean;
  
    @Field()
    created_at?: Date;
  
    @Field()
    updated_at?: Date;
}