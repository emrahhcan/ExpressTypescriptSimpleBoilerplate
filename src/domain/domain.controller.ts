import express, { Request, Response } from 'express';
import Container from 'typedi';

import { DomainService } from './domain.service';
import { ValidationMiddleware } from '../../libs/common/middleware/validation.middleware';
import { createSomethingSchema } from './dto/createSomething.dto';

const router = express.Router();
const domainService = Container.get(DomainService);
const validationMiddleware = Container.get(ValidationMiddleware);

router.get('/', (req: Request, res: Response) => {
  return domainService.getSomething(req, res);
});

router.post(
  '/create-something',
  validationMiddleware.validate(createSomethingSchema),
  (req: Request, res: Response) => {
    return domainService.createSomething(req, res);
  }
);

export default router;
