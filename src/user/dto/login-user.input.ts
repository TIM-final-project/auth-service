import {Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginUserInput {
  @Field({ nullable: false })
  readonly username: string;

  @Field({ nullable: false })
  readonly password: string;
}