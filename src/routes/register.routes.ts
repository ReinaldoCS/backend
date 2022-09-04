import { Router } from 'express';

import { RegisterUserService } from '../services/RegisterUserService';

export const registerRouter = Router();

registerRouter.post('/', async (request, response) => {
  const { email, name, password } = request.body;

  const registerUserService = new RegisterUserService();

  const user = await registerUserService.execute({ email, name, password });

  return response.json(user);
});
