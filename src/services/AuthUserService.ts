import { sign } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';

interface IResquest {
  user: string;
  password: string;
}

interface IResponse {
  auth: boolean;
  token: string;
}

export class AuthUserService {
  public execute({ user, password }: IResquest): IResponse {
    if (user === 'reinaldo' && password === 'teste1') {
      const id = 1;
      const token = sign({ id }, 'chave_secreta', { expiresIn: 300 });

      return { auth: true, token };
    }

    throw new AppError({
      errorCode: 'AUTH_ERROR',
      message: 'erro ao realizar autenticação',
    });
  }
}
