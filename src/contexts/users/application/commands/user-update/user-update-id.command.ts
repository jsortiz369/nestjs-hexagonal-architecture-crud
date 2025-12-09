import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserUpdateIdCommand {
  constructor(public readonly _id: Required<UserPrimitive['_id']>) {}
}
