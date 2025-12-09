export class UserFindProjection {
  constructor(
    readonly id: string,
    readonly fullName: string,
    readonly email: string,
    readonly status: string,
  ) {}
}
