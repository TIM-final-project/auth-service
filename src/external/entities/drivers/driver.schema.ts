import { Field, ObjectType, ID, Directive} from '@nestjs/graphql';
import { UserSchema } from 'src/user/user.schema';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class DriverSchema {
    @Field((type) => ID, { nullable: true })
    @Directive('@external')
    id?: number;

    @Field((type) => UserSchema)
    user?: UserSchema;

}
