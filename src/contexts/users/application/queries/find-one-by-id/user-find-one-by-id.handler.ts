import { UserQueryFindOneByIdService } from 'src/contexts/users/domain/service';
import { UserFindOneByIdQuery } from './user-find-one-by-id.query';
import { UserFindOneByIdProjection } from 'src/contexts/users/domain/projections';

export class UserFindOneByIdHandler {
  /**
   * Creates an instance of UserFindOneByIdHandler.
   * @date 2025-12-09 08:38:34
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UserQueryFindOneByIdService} _userQueryFindOneByIdService
   */
  constructor(private readonly _userQueryFindOneByIdService: UserQueryFindOneByIdService) {}

  async execute(idQuery: UserFindOneByIdQuery): Promise<UserFindOneByIdProjection> {
    // TODO: validate user by ID
    const user = await this._userQueryFindOneByIdService.execute(idQuery._id);
    return user;
  }
}
