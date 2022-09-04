import { Router } from 'express';

import { AuthUserService } from '../services/AuthUserService';

export const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = new AuthUserService();

  // const { auth, token } = await authUserService.execute({ user, password });
  const teste = await authUserService.execute({ email, password });

  return response.json(teste);
});
