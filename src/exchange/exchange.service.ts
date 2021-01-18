import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrencyService } from 'src/currency/currency.service';
import { ExchangeInputType } from './types/exchange.types';

@Injectable()
export class ExchangeService {
  constructor(private readonly currencyService: CurrencyService) { }
  async convertAmount({ from, to, amount }: ExchangeInputType): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException()
    }
    try {
      const currencyFrom = await this.currencyService.getCurrency(from);
      const currencyTo = await this.currencyService.getCurrency(to);
      return { amount: (currencyFrom.value / currencyTo.value) * amount }
    }
    catch (error) {
      throw new Error(error)
    }
  }
}