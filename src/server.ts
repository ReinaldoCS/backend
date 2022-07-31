import express, { Request, Response, NextFunction } from 'express';

import { AppError } from './errors/AppError';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.httpCode).json(err);
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Back-end started in 3333 port!');
});
