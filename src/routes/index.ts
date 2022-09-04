import { Router } from 'express';

import { loginRouter } from './login.routes';
import { registerRouter } from './register.routes';

const routes = Router();

routes.use('/session', loginRouter);
routes.use('/register', registerRouter);

export default routes;
