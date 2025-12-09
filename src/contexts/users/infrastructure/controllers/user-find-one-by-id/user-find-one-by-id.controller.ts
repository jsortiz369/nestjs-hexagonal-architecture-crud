import { Controller, Get, Param } from '@nestjs/common';

import { UuidDto } from 'src/app/http/dto';
import { ROUTES } from 'src/app/http/routes';
import { UserFindOneByIdHandler, UserFindOneByIdQuery } from 'src/contexts/users/application';

@Controller(ROUTES.USERS)
export class UserFindOneByIdController {
  constructor(private readonly _handler: UserFindOneByIdHandler) {}

  @Get(':id')
  async execute(@Param() param: UuidDto) {
    const result = await this._handler.execute(new UserFindOneByIdQuery(param.id));
    return result;
  }
}
