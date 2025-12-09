import { UserFindOneByIdProjection } from '../projections';

export abstract class UserQueryRepository {
  abstract findOneById(id: string): Promise<UserFindOneByIdProjection | null>;
}
