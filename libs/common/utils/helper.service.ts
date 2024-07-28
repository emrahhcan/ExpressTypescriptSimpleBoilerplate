import { Service } from 'typedi';

@Service()
export class HelperService {
  constructor() {}

  // Left for reference
  isJsonString(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }
}
