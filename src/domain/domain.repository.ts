import { Service } from 'typedi';

import { Domain } from './domain.model';

@Service()
export class DomainRepository {
  async getSomething(query = {}) {
    try {
      const something = await Domain.find(query);
      return something;
    } catch (error) {
      throw error;
    }
  }

  async createSomething(query = {}) {
    try {
      const something = await Domain.create(query);
      return something;
    } catch (error) {
      throw error;
    }
  }
}
