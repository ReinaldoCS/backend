import { User } from '@prisma/client';
import { hashSync } from 'bcryptjs';

import { prismaClient } from '../config';
import { AppError } from '../errors/AppError';

interface IResquest {
  email: string;
  name: string;
  password: string;
}

export class RegisterUserService {
  async execute({ email, name, password }: IResquest): Promise<User> {
    const userAlreadyExists = await prismaClient.user.findUnique({ where: { email } });

    if (userAlreadyExists) {
      throw new AppError({
        errorCode: 'EMAIL_ALREADY_REGISTED',
        message: 'E-mail já cadastrado',
      });
    }

    const hashPass = hashSync(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        Password: { create: { password: hashPass } },
      },
    });

    return user;
  }
}
