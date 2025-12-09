import { UserRepository } from 'src/contexts/users/domain/repositories';
import { UserCreateCommand } from './user-create.command';
import { UuidRepository } from 'src/shared/uuid/domain/uuid.repository';
import { User } from 'src/contexts/users/domain/user';
import { UserConflictEmailException } from 'src/contexts/users/domain/exceptions';
import { UserPrimitive } from 'src/contexts/users/domain/user.interface';

export class UserCreateHandler {
  /**
   * Creates an instance of UserCreateHandler.
   * @date 2025-12-05 16:31:16
   * @author Jogan Ortiz Muñoz
   *
   * @constructor
   * @param {UuidRepository} _uuidRepository
   * @param {UserRepository} _userRepository
   */
  constructor(
    private readonly _uuidRepository: UuidRepository,
    private readonly _userRepository: UserRepository,
  ) {}

  /**
   * @description Execute create user and validate not exist user by email
   * @date 2025-12-05 17:35:39
   * @author Jogan Ortiz Muñoz
   *
   * @async
   * @param {UserCreateCommand} command
   * @returns {Promise<Omit<UserPrimitive, 'password'>>}
   */
  async execute(command: UserCreateCommand): Promise<Omit<UserPrimitive, 'password'>> {
    // TODO: Generate user Entity
    const user = User.create({
      _id: this._uuidRepository.generateUuid(),
      firstName: command.firstName,
      secondName: command.secondName,
      firstSurname: command.firstSurname,
      secondSurname: command.secondSurname,
      birthday: command.birthday,
      phone: command.phone,
      email: command.email,
      password: command.password,
      role: command.role,
      status: command.status,
    });

    // TODO: Validate existing user by email
    const exists = await this._userRepository.existByEmail(user.email);
    if (exists) throw new UserConflictEmailException();

    // TODO: Create user
    const createdUser = await this._userRepository.create(user);

    // TODO: return user values primitives
    const userPrimitive = createdUser.toValuesPrimitives();
    return {
      _id: userPrimitive._id,
      firstName: userPrimitive.firstName,
      secondName: userPrimitive.secondName,
      firstSurname: userPrimitive.firstSurname,
      secondSurname: userPrimitive.secondSurname,
      birthday: userPrimitive.birthday,
      phone: userPrimitive.phone,
      email: userPrimitive.email,
      role: userPrimitive.role,
      status: userPrimitive.status,
      createdAt: userPrimitive.createdAt,
      updatedAt: userPrimitive.updatedAt,
    };
  }
}
