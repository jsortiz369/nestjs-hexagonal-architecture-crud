import { UserPrimitive } from '../user.interface';

type TypeProjection = Omit<UserPrimitive, 'password' | 'deletedAt'>;

export class UserFindOneByIdProjection implements TypeProjection {
  /**
   * Creates an instance of UserFindOneByIdProjection.
   * @date 2025-12-09 07:58:56
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {TypeProjection['_id']} _id
   * @param {TypeProjection['firstName']} firstName
   * @param {TypeProjection['secondName']} secondName
   * @param {TypeProjection['firstSurname']} firstSurname
   * @param {TypeProjection['secondSurname']} secondSurname
   * @param {TypeProjection['birthday']} birthday
   * @param {TypeProjection['phone']} phone
   * @param {TypeProjection['email']} email
   * @param {TypeProjection['photo']} photo
   * @param {TypeProjection['status']} status
   * @param {TypeProjection['role']} role
   * @param {TypeProjection['createdAt']} createdAt
   * @param {TypeProjection['updatedAt']} updatedAt
   */
  constructor(
    readonly _id: TypeProjection['_id'],
    readonly firstName: TypeProjection['firstName'],
    readonly secondName: TypeProjection['secondName'],
    readonly firstSurname: TypeProjection['firstSurname'],
    readonly secondSurname: TypeProjection['secondSurname'],
    readonly birthday: TypeProjection['birthday'],
    readonly phone: TypeProjection['phone'],
    readonly email: TypeProjection['email'],
    readonly photo: TypeProjection['photo'],
    readonly status: TypeProjection['status'],
    readonly role: TypeProjection['role'],
    readonly createdAt: TypeProjection['createdAt'],
    readonly updatedAt: TypeProjection['updatedAt'],
  ) {}
}
