import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserDeleteCommand {
  constructor(public readonly id: UserPrimitive['_id']) {}
}
