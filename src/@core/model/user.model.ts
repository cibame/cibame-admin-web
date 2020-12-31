export interface User {
  readonly uuid: string;
  readonly email: string;
  readonly phone: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string;
}
