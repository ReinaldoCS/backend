import { Router } from 'express';

import { AuthUserService } from '../services/AuthUserService';

export const loginRouter = Router();

loginRouter.post('/', (request, response) => {
  const { user, password } = request.body;

  const authUserService = new AuthUserService();

  const { auth, token } = authUserService.execute({ user, password });

  return response.json({ auth, token });
});
