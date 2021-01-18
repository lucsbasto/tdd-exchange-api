import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Currency } from './currency.entity';
import { CurrencyRepository } from './currency.repository';
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

  async deleteCurrency(currency: string): Promise<String> {
      await this.currencyRepository.deleteCurrency(currency)
      return `${currency} deleted.`
  }

}
