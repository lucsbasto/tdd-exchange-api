import { Injectable, InternalServerErrorException } from '@nestjs/common';

export class CurrencyRepository {
  async getCurrency(currency: string): Promise<any> {}
}
@Injectable()
export class CurrencyService {
  constructor(private currencyRepository: CurrencyRepository){}
  async getCurrency(currency: string): Promise<any> {
    try {
      await this.currencyRepository.getCurrency(currency)
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
