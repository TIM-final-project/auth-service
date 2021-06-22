import { ArgsType, PartialType } from "@nestjs/graphql";
import { CreateUserInput } from "./create-user.input";

@ArgsType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}