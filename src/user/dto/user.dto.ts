import { ObjectType, PartialType, OmitType, Field } from "@nestjs/graphql";
import { UserSchema } from "../user.schema";

@ObjectType()
export class UserDto extends PartialType(OmitType(UserSchema, ['password'] as const)){

}