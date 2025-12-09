import { UserNotFoundException } from '../exceptions';
import { UserQueryRepository } from '../repositories';

export class UserQueryFindOneByIdService {
  constructor(private readonly _userQueryRepository: UserQueryRepository) {}

  async execute(id: string) {
    const user = await this._userQueryRepository.findOneById(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }
}
