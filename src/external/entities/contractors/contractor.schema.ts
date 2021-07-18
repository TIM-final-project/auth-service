import { Field, ObjectType, ID, Directive} from '@nestjs/graphql';
import { UserSchema } from 'src/user/user.schema';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class ContractorSchema {
    @Directive('@external')
    @Field((type) => ID, { nullable: true })
    id?: number;

    @Field((type) => UserSchema)
    user?: UserSchema;

}
