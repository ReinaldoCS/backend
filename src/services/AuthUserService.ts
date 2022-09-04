import { User } from '@prisma/client';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { prismaClient } from '../config';
import { AppError } from '../errors/AppError';

interface IResquest {
  email: string;
  password: string;
}

type IUserInfo = Pick<User, 'email' | 'name' | 'updated_at' | 'created_at'>;

interface IUserDTO {
  auth: boolean;
  token: string;
}

export class AuthUserService {
  public async execute({ email, password }: IResquest): Promise<IUserDTO> {
    const findUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      throw new AppError({
        errorCode: 'EMAIL_NOT_FOUND',
        message: 'Email não encontrado',
      });
    }

    const validatePassword = compareSync(password, findUser.password);

    if (!validatePassword) {
      throw new AppError({
        errorCode: 'INVALID_PASSWORD',
        message: 'Erro na validação da senha',
      });
    }

    const user: IUserInfo = {
      email: findUser.email,
      name: findUser.name,
      updated_at: findUser.updated_at,
      created_at: findUser.created_at,
    };

    const token = sign(user, process.env.SECRET ?? '', { expiresIn: '1h' });

    return { auth: true, token };
  }
}
