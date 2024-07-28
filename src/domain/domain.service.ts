import { Request, Response } from 'express';
import { Service } from 'typedi';

import { DomainRepository } from './domain.repository';
import { CreateSomethingDto } from './dto/createSomething.dto';

@Service()
export class DomainService {
  constructor(private readonly domainRepository: DomainRepository) {}

  async getSomething(_req: Request, res: Response) {
    try {
      const something = this.domainRepository.getSomething({});

      return res.status(200).json(something);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return res
        .status(statusCode)
        .json(error.message || 'Internal server error');
    }
  }

  async createSomething(req: Request, res: Response) {
    try {
      const createSomethingDto: CreateSomethingDto = req.body;

      await this.domainRepository.createSomething({
        something: createSomethingDto.something,
      });

      return res.status(200).json('Successfully shared something');
    } catch (error) {
      return res.status(500).json(error.message || 'Internal server error');
    }
  }
}
