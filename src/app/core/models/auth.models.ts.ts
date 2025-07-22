import { User } from './user';
import { Token } from './Token.model';
import { Response } from './Response.model';

export interface AuthModels extends Response {
  data: {
    token: Token;
    dataSap: User[];
  };
  menu?: unknown[];
}
