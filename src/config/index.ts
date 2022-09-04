import { PrismaClient } from '@prisma/client';

export const auth = {
  secret: 'chave',
  expires: '1h',
};

export const prismaClient = new PrismaClient();
