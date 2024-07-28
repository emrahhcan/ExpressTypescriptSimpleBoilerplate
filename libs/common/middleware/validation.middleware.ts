import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { Service } from 'typedi';

@Service()
export class ValidationMiddleware {
  validate = (schema: Joi.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req.body);
        next();
      } catch (error) {
        res.status(400).json(error.message);
      }
    };
  };
}
