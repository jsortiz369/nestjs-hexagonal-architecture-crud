import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserFindOneByIdQuery {
  constructor(public readonly _id: Required<UserPrimitive['_id']>) {}
}
