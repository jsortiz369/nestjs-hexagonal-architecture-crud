import { $Enums } from 'generated/mysql/prisma';
import { UserFindOneByIdProjection } from 'src/contexts/users/domain/projections';
import { UserQueryRepository } from 'src/contexts/users/domain/repositories';
import { PrismaMysqlPersistence } from 'src/shared/database/infrastructure/persistences';
import { RoleType, StatusType } from 'src/shared/system/domain/system.interface';

export class UserQueryPersistence implements UserQueryRepository {
  constructor(private readonly _prisma: PrismaMysqlPersistence) {}

  async findOneById(id: string): Promise<UserFindOneByIdProjection | null> {
    const result = await this._prisma.user.findFirst({
      where: { id, deletedAt: null },
      omit: { password: true, deletedAt: true },
    });

    if (!result) return null;

    const role = result.role == $Enums.Role.ADMIN ? RoleType.ADMIN : RoleType.USER;
    const status = result.status == $Enums.Status.ACTIVE ? StatusType.ACTIVE : StatusType.INACTIVE;

    return new UserFindOneByIdProjection(
      result.id,
      result.firstName,
      result.secondName,
      result.firstSurname,
      result.secondSurname,
      result.birthday,
      result.phone,
      result.email,
      result.photo,
      status,
      role,
      result.createdAt,
      result.updatedAt,
    );
  }
}
