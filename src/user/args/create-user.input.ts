import {Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateUserInput {
  @Field()
  readonly username: string;
  @Field()
  password: string;
  @Field()
  readonly rol: number;
}