import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

export class Currency {
  currency: string;
  value: number;
}
export class CurrencyRepository {
  async getCurrency(currency: string): Promise<Currency> {
    return new Currency()
  }

  async createCurrency(currency: Currency): Promise<Currency> {
    return new Currency()
  }

  async updateCurrency(currency: Currency): Promise<Currency> {
    return new Currency()
  }
}
@Injectable()
export class CurrencyService {
  constructor(private currencyRepository: CurrencyRepository){}

  async createCurrency(currency: Currency): Promise<Currency> {
    if(currency.value > 0){
      return this.currencyRepository.createCurrency(currency);
    }
    throw new BadRequestException('The value must be greater than zero')
  }

  async updateCurrency(currency: Currency): Promise<Currency> {
    if(currency.value > 0){
      return this.currencyRepository.updateCurrency(currency);
    }
    throw new BadRequestException('The value must be greater than zero')
  }

  async getCurrency(currency: string): Promise<Currency> {
      return await this.currencyRepository.getCurrency(currency)
  }
}
