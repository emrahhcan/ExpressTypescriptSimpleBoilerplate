import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { SOME_API_KEY } from '../constant/dotenv.constant';
import { BadRequestError, UnauthorizedError } from '../error/Error';

@Service()
export class ApiAccessMiddleware {
  public validateSomeApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-some-api-key'];

    try {
      if (!apiKey) {
        throw new BadRequestError('API key is required');
      }

      if (apiKey !== SOME_API_KEY) {
        throw new UnauthorizedError('Unauthorized');
      }

      next();
    } catch (error) {
      const errorCode = error.statusCode || 401;
      return res.status(errorCode).json(error.message || 'Unauthorized');
    }
  }
}
