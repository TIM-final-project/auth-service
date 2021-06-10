import { ObjectType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { UserSchema } from 'src/user/user.schema';

@ObjectType()
export class LoginDto extends PartialType(OmitType(UserSchema, ['password'] as const)){
    @Field({ nullable : false})
    access_token: string;

}