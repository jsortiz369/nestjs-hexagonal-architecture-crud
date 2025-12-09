import { Provider } from '@nestjs/common';

import { PrismaMysqlPersistence } from 'src/shared/database/infrastructure/persistences';
import { EnvRepository } from 'src/shared/env/domain/env.repository';
import { UserQueryRepository } from '../../domain/repositories/user-query.repository';
import { UserRepository } from '../../domain/repositories';
import { UserPersistence, UserQueryPersistence } from './mysql';

export const UserPersistenceProvider: Provider = {
  provide: UserRepository,
  useFactory: (_envRepository: EnvRepository, mysql: PrismaMysqlPersistence): UserRepository => {
    const typeDb = _envRepository.get('DB_TYPE');
    if (typeDb === 'mysql') return new UserPersistence(mysql);
    throw new Error('No persistence defined for UserRepository');
  },
  inject: [EnvRepository, PrismaMysqlPersistence],
};

export const UserQueryPersistenceProvider: Provider = {
  provide: UserQueryRepository,
  useFactory: (_envRepository: EnvRepository, mysql: PrismaMysqlPersistence): UserQueryRepository => {
    const typeDb = _envRepository.get('DB_TYPE');
    if (typeDb === 'mysql') return new UserQueryPersistence(mysql);
    throw new Error('No persistence defined for UserRepository');
  },
  inject: [EnvRepository, PrismaMysqlPersistence],
};
